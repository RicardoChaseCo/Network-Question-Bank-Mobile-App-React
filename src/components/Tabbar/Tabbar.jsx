import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import home_2 from "@/assets/images/tabbar/home_2.png";
import home_1 from "@/assets/images/tabbar/home_1.png";
import fast from "@/assets/images/tabbar/fast.png";
import my_2 from "@/assets/images/tabbar/my_2.png";
import my_1 from "@/assets/images/tabbar/my_1.png";
import "./Tabbar.less";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function Tabbar() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [showTabbar, setShowTabbar] = React.useState(true);

  // 在赋值给value之前，我们需要先做判断，根据当前的路由地址，来决定到底myindex等于多少
  // componentDidMount
  // 检测的变化对象是路由地址
  React.useEffect(() => {
    // useEffect是异步的
    switch (history.location.pathname) {
      case "/home":
        setValue(0);
        setShowTabbar(true);
        break;
      case "/fast":
        setValue(1);
        setShowTabbar(true);
        break;
      case "/user":
        setValue(2);
        setShowTabbar(true);
        break;
      default:
        setValue(0);
        setShowTabbar(false);
        break;
    }
  }, [history.location.pathname]);  // 检测路由的更新

  return (
    <BottomNavigation
      value={value}
      style={{display: showTabbar ? 'flex' : 'none'}}
      onChange={(event, newValue) => {
        setValue(newValue);
        switch (newValue) {
          case 0:
            history.push("/home");
            break;
          case 1:
            history.push("/fast");
            break;
          case 2:
            history.push("/user");
            break;
          default:
            break;
        }
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="首页"
        icon={<img src={value === 0 ? home_1 : home_2} alt="" />}
      />
      <BottomNavigationAction label="快速刷题" icon={<img src={fast} alt="" />} />
      <BottomNavigationAction
        label="我的"
        icon={<img src={value === 2 ? my_1 : my_2} alt="" />}
      />
    </BottomNavigation>
  );
}
