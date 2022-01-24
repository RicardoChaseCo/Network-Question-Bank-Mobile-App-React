import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { RegisterApi } from '@/request/api'
import { useHistory, Link } from 'react-router-dom'		// useHistory也可以给组件注入路由
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
    const [phone, setPhone] = useState("");
    // 密码
    const [password, setPassword] = useState("");
    // 获取路由
    const history = useHistory()

    // 点击了注册
    function submitFn() {
        RegisterApi({
            phone: Number(phone),
            password
        }).then(res => {
            if (res.errCode === 0) {
                // 成功
                showHideAlert(props, {
                    showAlert: true,
                    alertType: "success",
                    alertContent: "注册成功，即将返回登录页"
                })
                // 2秒后跳转到登录页
                setTimeout(() => {
                    // 返回登录页
                    history.push('/login');
                }, 2000)
            } else {
                showHideAlert(props, {
                    showAlert: true,
                    alertType: "error",
                    alertContent: res.message
                })
            }
        }).catch(err => {
            showHideAlert(props, {
                showAlert: true,
                alertType: "error",
                alertContent: err.response.data.message
            })
        })
    }

    return (
        <div className={classes.loginPage}>
            <img src={logo} className={classes.logo} alt="" />
            <h2 className={classes.title}>Register Page</h2>
            <form className={classes.root}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    placeholder="请输入手机号码"
                    name="phone"
                    autoComplete="phone"
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                >立即注册</Button>
                <Link to="/login" variant="body2" style={{ color: '#02369d', marginTop: '20px' }}>返回登录</Link>
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