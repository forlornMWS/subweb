const getSubLink = function (urls, api, target, remoteConfig, isShowMoreConfig, moreConfig) {
  console.log('urls:', urls);
  if (!urls || urls === '' || urls.length === 0) {
    return '';
  }
  let linkLst = urls.split('\n');
  let link = linkLst.join('|');
  let finalUrl = api + '/sub?target=' + target + '&url=' + encodeURIComponent(link);
  if (remoteConfig) {
    finalUrl = finalUrl + '&config=' + encodeURIComponent(remoteConfig);
  }
  if (isShowMoreConfig) {
    if (moreConfig.include !== '') {
      finalUrl = finalUrl + '&include=' + encodeURIComponent(moreConfig.include);
    }
    if (moreConfig.exclude !== '') {
      finalUrl = finalUrl + '&exclude=' + encodeURIComponent(moreConfig.exclude);
    }
    if (moreConfig.emoji) {
      finalUrl = finalUrl + '&emoji=true';
    } else {
      finalUrl = finalUrl + '&emoji=false';
    }
    if (moreConfig.udp) {
      finalUrl = finalUrl + '&udp=true';
    } else {
      finalUrl = finalUrl + '&udp=false';
    }
    if (moreConfig.sort) {
      finalUrl = finalUrl + '&sort=true';
    } else {
      finalUrl = finalUrl + '&sort=false';
    }
    if (moreConfig.scv) {
      finalUrl = finalUrl + '&scv=true';
    } else {
      finalUrl = finalUrl + '&scv=false';
    }
    if (moreConfig.list) {
      finalUrl = finalUrl + '&list=true';
    } else {
      finalUrl = finalUrl + '&list=false';
    }
  }
  return finalUrl;
};

const regexCheck = function (url) {
  const reg_url = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
  return reg_url.test(url);
};

export { regexCheck, getSubLink };
