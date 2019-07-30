const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  isLogin: state => state.user.isLogin,
  usrInfo: state => state.user.usrInfo,
  name: state => state.user.name,
  avatar: state => state.user.avatar
}
export default getters
