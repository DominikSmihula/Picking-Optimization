import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { Logger } from '../../logger/logger';

@Injectable()
export class AxiosService {
  private readonly axiosInstance: AxiosInstance;
  constructor(
    private logger: Logger
  ) {
    this.axiosInstance = axios.create()

    this.axiosInstance.interceptors.request.use(async (config: any) => {
      config.metadata = { startTime: Date.now() };
      config.headers = {
        ...config.headers,
      };
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const duration = Date.now() - response.config['metadata']?.startTime;
        this.logger.info({
          text: 'service call',
          data: {
            url: response?.config?.url,
            status: response?.status,
            duration,
          },
        });
        return response;
      },
      (err) => {
        const duration = Date.now() - err.config['metadata']?.startTime;
        this.logger.info({
          text: 'service call',
          data: {
            url: err?.config?.url,
            status: err?.response?.status,
            duration,
          },
        });
        throw err;
      },
    );
  }

  public request<T>(config: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance
      .request<T>(config)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
}
