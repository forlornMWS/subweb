import axios from 'axios';

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    // 请求超时时间
    timeout: 5000,
  });

  return instance(config);
}
