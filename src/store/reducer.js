// 定义默认状态
const defaultState = {
  showAlert: false,
  // success info  warning  error
  alertType: "success",
  alertContent: ""
}

// 导出一个函数
// eslint-disable-next-line
export default (state=defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type){
    case "showAlert":
      newState.showAlert = action.value.showAlert;
      newState.alertType = action.value.alertType;
      newState.alertContent = action.value.alertContent;
      break;
    case "hideAlert":
      newState.showAlert = false;
      break;
    default:
      break;
  }

  return newState;
}

