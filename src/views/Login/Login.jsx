import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { LoginApi } from '@/request/api'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '@/assets/images/logo.png'
import {AlertMapDispatchToProps, showHideAlert} from '@/utils'

const useStyles = makeStyles((theme) => ({
  loginPage: {
    background: '#fff',
    height: '100vh',
    overflow: 'hidden'
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    marginTop: '20vh'
  },
  title: {
    fontSize: '.5rem',
    textAlign: 'right',
    width: '90%',
    margin: '0 auto 20px',
    color: '#02369d'
  },
  btn: {
    color: "#fff",
    fontWeight: 'normal',
    background: "#02369d"
  },
  copyright: {
    width: '90%',
    margin: '20px auto',
    paddingLeft: '8px',
    boxSizing: 'border-box'
  },
  root: {
    width: '90%',
    margin: 'auto',
    '& > *': {
      width: '100%',
      display: 'block',
      fontSize: '.5rem',
    },
    '& .MuiTextField-root': {
      fontSize: '.5rem',
      '& .MuiInputBase-input': {
        fontSize: '.5rem'
      }
    }
  },
}));

function SignIn(props) {
  const classes = useStyles();
  // 用户名
  const [username, setUsername] = useState("");
  // 密码
  const [password, setPassword] = useState("wolfcode123");
  // 获取路由
  const history = useHistory()

  // 点击了登录
  function submitFn() {
    LoginApi({
      username,
      password
    }).then(res => {
      if (res.errCode === 0) {
        // 成功的提示
        showHideAlert(props, {
          showAlert: true,
          alertType: "success",
          alertContent: "登录成功，即将返回首页"
        })
        let token = res.data;
        // 存入token
        localStorage.setItem('x-auth-token', token);
        // 2秒后跳转到首页
        setTimeout(() => {
          // 返回首页
          history.push("/home");
        }, 2000)
      }else {
        // 失败的提示
        showHideAlert(props, {
          showAlert: true,
          alertType: "error",
          alertContent: res.message
        })
      }
    })
  }

  return (
    <div className={classes.loginPage}>
      <img src={logo} className={classes.logo} alt="" />
      <h2 className={classes.title}>Login Page</h2>
      <form className={classes.root}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          placeholder="请输入用户名"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="请输入密码"
          type="password"
          id="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={classes.btn}
          type="button"
          fullWidth
          variant="contained"
          onClick={submitFn}
        >直接登录</Button>
        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
          <Link to="/register" variant="body2" style={{ color: '#02369d'  }}>前往注册</Link>
          <Link to="/home" variant="body2" style={{ color: '#999999' }}>返回首页</Link>
        </div>
      </form>
      <section className={classes.copyright}>
        {'Copyright © '}
        <Link color="inherit" to="http://codesohigh.com">
          你单排吧
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </section>
    </div>
  );
}


export default connect(null, AlertMapDispatchToProps)(SignIn)