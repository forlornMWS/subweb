<template>
  <div class="row g-4 custom-div">
    <div class="col-12 col-lg-12 pt-4 pt-lg-0">
      <div class="tab-content p-0">
        <div class="tab-pane fade show active">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row mb-3 g-3">
                <!-- 订阅链接输入框 -->
                <div class="col-12">
                  <label class="form-label" for="subscription-url">订阅链接</label>
                  <textarea 
                    id="subscription-url"
                    class="form-control" 
                    v-model.trim="urls"
                    :placeholder="placeholder"
                    rows="3"
                  ></textarea>
                </div>


                <!-- 客户端选择 -->
                <div class="col-md-6">
                  <label class="form-label" for="client">客户端</label>
                  <select 
                    class="form-select" 
                    id="client" 
                    v-model="target"
                    @change="selectTarget"
                  >
                    <option 
                      v-for="option in targetOptions" 
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </div>

                <!-- 后端服务选择 -->
                <div class="col-md-6">
                  <label class="form-label" for="api">后端服务</label>
                  <select 
                    class="form-select" 
                    id="api"
                    @change="selectApi"
                  >
                    <option :value="apiUrl">{{ apiUrl }}</option>
                    <option value="manual">自定义后端 API 地址</option>
                  </select>
                </div>

                <!-- 自定义API地址输入框 -->
                <div class="col-12" v-show="isShowManualApiUrl">
                  <input 
                    class="form-control"
                    placeholder="自定义后端 API 地址示例：https://sub.ops.ci"
                    v-model="api"
                  />
                </div>

                <!-- 远程配置选择 -->
                <div class="col-md-10">
                  <label class="form-label" for="remote">远程配置</label>
                  <select 
                    class="form-select" 
                    id="remote"
                    @change="selectRemoteConfig"
                  >
                    <option value="">默认配置</option>
                    <option 
                      v-for="option in remoteConfigOptions" 
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                    <option value="manual">自定义远程配置地址</option>
                  </select>
                </div>

                <!-- 参数按钮 -->
                <div class="col-md-2">
                  <label class="form-label">&nbsp;</label>
                  <button 
                    type="button" 
                    class="btn btn-warning"
                    @click="showMoreConfig"
                  >
                    参数
                  </button>
                </div>

                <!-- 自定义远程配置地址 -->
                <div class="col-12" v-show="isShowRemoteConfig">
                  <input 
                    class="form-control"
                    placeholder="自定义远程配置地址："
                    v-model="remoteConfig"
                  />
                </div>

                <!-- 可选参数配置 -->
                <div class="col-12" v-show="isShowMoreConfig">
                  <label class="form-label">可选参数</label>
                  <div class="row g-3">
                    <div class="col-12">
                      <input 
                        class="form-control"
                        placeholder="Include: 可选"
                        v-model="moreConfig.include"
                      />
                    </div>
                    <div class="col-12">
                      <input 
                        class="form-control"
                        placeholder="Exclude: 可选"
                        v-model="moreConfig.exclude"
                      />
                    </div>
                    <div class="col-md check-div">
                      <div class="form-check form-check-inline">
                        <input 
                          class="form-check-input"
                          type="checkbox"
                          id="emoji"
                          v-model="moreConfig.emoji"
                        />
                        <label class="form-check-label" for="emoji">Emoji</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input 
                          class="form-check-input"
                          type="checkbox"
                          id="udp"
                          v-model="moreConfig.udp"
                        />
                        <label class="form-check-label" for="udp">开启UDP</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input 
                          class="form-check-input"
                          type="checkbox"
                          id="sort"
                          v-model="moreConfig.sort"
                        />
                        <label class="form-check-label" for="sort">排序节点</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input 
                          class="form-check-input"
                          type="checkbox"
                          id="scv"
                          v-model="moreConfig.scv"
                        />
                        <label class="form-check-label" for="scv">关闭证书检查</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input 
                          class="form-check-input"
                          type="checkbox"
                          id="nodelist"
                          v-model="moreConfig.list"
                        />
                        <label class="form-check-label" for="nodelist">Node List</label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 分隔线 -->
                <div class="col-12">
                  <div class="divider divider-dashed">
                    <div class="divider-text">
                      <i class="ti ti-refresh" style="color: gray"></i>
                    </div>
                  </div>
                </div>

                <!-- 转换链接 -->
                <div class="col-md-10">
                  <input 
                    class="form-control"
                    placeholder="点击转换链接"
                    v-model.trim="result.subUrl"
                    readonly
                  />
                </div>
                <div class="col-md-2">
                  <button 
                    type="button"
                    class="btn btn-success"
                    @click="getSubUrl"
                  >
                    转换
                  </button>
                </div>

                <!-- 短链接 -->
                <div class="col-md-10">
                  <input 
                    class="form-control"
                    placeholder="点击获取短链"
                    v-model.trim="result.shortUrl"
                    readonly
                  />
                </div>
                <div class="col-md-2">
                  <button 
                    type="button"
                    class="btn btn-primary"
                    @click="getShortUrl"
                  >
                    短链
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showLoading, hideLoading } from '@/components/loading';
import { getSubLink, regexCheck } from './index.js';
import { request } from '@/network';
import showNotification from '@/components/notification';

export default {
  name: 'SubTable',
  
  setup() {
    const DEFAULT_MORECONFIG = {
      include: '',
      exclude: '',
      emoji: true,
      udp: true,
      sort: false,
      scv: false,
      list: false,
    };
    return {
      DEFAULT_MORECONFIG,
    };
  },

  data() {
    return {
      placeholder: '多订阅链接或节点请确保每行一条\n支持手动使用"|"分割多链接或节点',
      targetOptions: [
        { value: 'clash', text: 'Clash' },
        { value: 'clashr', text: 'ClashR' },
        { value: 'v2ray', text: 'V2Ray' },
        { value: 'quan', text: 'Quantumult' },
        { value: 'quanx', text: 'Quantumult X' },
        { value: 'surge&ver=2', text: 'SurgeV2' },
        { value: 'surge&ver=3', text: 'SurgeV3' },
        { value: 'surge&ver=4', text: 'SurgeV4' },
        { value: 'surfboard', text: 'Surfboard' },
        { value: 'ss', text: 'SS (SIP002)' },
        { value: 'sssub', text: 'SS Android' },
        { value: 'ssd', text: 'SSD' },
        { value: 'ssr', text: 'SSR' },
        { value: 'loon', text: 'Loon' },
        { value: 'singbox', text: 'Sing-box' },
      ],
      apiUrl: window.config.apiUrl,
      shortUrl: window.config.shortUrl,
      remoteConfigOptions: window.config.remoteConfigOptions,
      moreConfig: this.DEFAULT_MORECONFIG,
      isShowMoreConfig: false,
      isShowManualApiUrl: false,
      isShowRemoteConfig: false,
      result: {
        subUrl: '',
        shortUrl: '',
      },
      urls: [],
      api: window.config.apiUrl,
      target: 'clash',
      remoteConfig: '',
    };
  },

  methods: {
    showMoreConfig() {
      this.isShowMoreConfig = !this.isShowMoreConfig;
    },

    selectApi(event) {
      const value = event.target.value;
      this.isShowManualApiUrl = value === 'manual';
      this.api = this.isShowManualApiUrl ? '' : value;
    },

    selectRemoteConfig(event) {
      const value = event.target.value;
      this.isShowRemoteConfig = value === 'manual';
      this.remoteConfig = this.isShowRemoteConfig ? '' : value;
    },

    async toCopy(url, title) {
      if (!url) {
        this.$showDialog('warning', '注意', '复制失败 内容为空');
        return;
      }

      try {
        await navigator.clipboard.writeText(url);
        showNotification(title + ' 复制成功', '成功');
      } catch (err) {
        this.$showDialog('warning', '注意', '复制失败，请检查浏览器兼容性');
      }
    },

    getConverter() {
      if (!this.urls) {
        this.$showDialog('warning', '注意', '请输入订阅链接或节点');
        return false;
      }

      if (!regexCheck(this.api)) {
        this.$showDialog('warning', '注意', '请输入自定义后端 API 地址，或选择默认后端服务。');
        return false;
      }

      if (this.remoteConfig === '' && this.isShowRemoteConfig) {
        this.$showDialog('warning', '注意', '请输入远程配置地址，或选择默认配置。');
        return false;
      }

      // 自动删除末尾的斜杠
      this.api = this.api.replace(/\/$/, '');

      this.result.subUrl = getSubLink(
        this.urls,
        this.api,
        this.target,
        this.remoteConfig,
        this.isShowMoreConfig,
        this.moreConfig
      );

      return true;
    },

    getSubUrl() {
      if (this.getConverter()) {
        this.toCopy(this.result.subUrl, '订阅链接');
      }
    },

    async getShortUrl() {
      if (!this.getConverter()) return;

      try {
        showLoading();
        const res = await request({
          method: 'post',
          url: this.shortUrl,
          data: JSON.stringify({ longUrl: this.result.subUrl }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.data.code === '200' && res.data.data) {
          this.result.shortUrl = window.config.shortUrlVisit + res.data.data;
          this.toCopy(this.result.shortUrl, '短链接');
        }
      } catch (err) {
        this.$showDialog('error', '失败', '短链接生成失败 请检查短链接服务是否可用');
      } finally {
        hideLoading();
      }
    },
  },
};
</script>

<style scoped>
.custom-div {
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .custom-div {
    width: 90%;
  }
}

@media (min-width: 992px) {
  .custom-div {
    width: 80%;
  }
}

@media (min-width: 1200px) {
  .custom-div {
    width: 70%;
  }
}

.btn {
  width: 100%;
}

.check-div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.divider {
  margin: 1rem 0;
}
</style>
