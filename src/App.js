import React from 'react'
import * as request from './request/index'
import { List, Avatar, Layout, Row, Col } from 'antd';
import { ManOutlined, WomanOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        [2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 0, 2, 0, 2, 0, 2],
        [2, 0, 0, 2, 0, 2, 2],
        [2, 2, 0, 2, 0, 2, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 0, 2]
      ],
      start_x: 1,
      start_y: 1,
      status: true,
      path: 'center',
      go_router: []
    }
  }

  componentDidMount() {
    let { data, start_y, start_x } = this.state
    data[start_y][start_x] = 1
    this.setState({ data: data, now_x: start_x, now_y: start_y })

    this.do_something()
    this.timerId = setInterval((() =>
      this.do_something()
    ), 800);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  do_something = async () => {
    let { now_y, now_x, path, status } = this.state

    let down_status = false
    let right_status = false
    let left_status = false
    let up_status = false

    if (status === true) {
      switch (path) {
        case 'center':

          down_status = await this.check_down(now_y, now_x)
          right_status = await this.check_right(now_y, now_x)
          left_status = await this.check_left(now_y, now_x)
          up_status = await this.check_up(now_y, now_x)
          console.log({
            down_status: down_status,
            right_status: right_status,
            left_status: left_status,
            up_status: up_status
          })

          if (down_status === true) {
            await this.go_down(now_y, now_x)
          } else if (right_status === true) {
            await this.go_right(now_y, now_x)
          } else if (left_status === true) {
            await this.go_left(now_y, now_x)
          } else if (up_status === true) {
            await this.go_up(now_y, now_x)
          } else {
            window.alert('肏你媽一開始就沒路')
            console.log('肏你媽一開始就沒路')
            clearInterval(this.timerId);
          }

          break
        case 'left':
          down_status = await this.check_down(now_y, now_x)
          left_status = await this.check_left(now_y, now_x)
          up_status = await this.check_up(now_y, now_x)

          if (down_status === true) {
            await this.go_down(now_y, now_x)
          } else if (left_status === true) {
            await this.go_left(now_y, now_x)
          } else if (up_status === true) {
            await this.go_up(now_y, now_x)
          } else {
            //TODO: 
            window.alert(`無路可走`)
            console.log('fuck you')
          }
          break
        case 'right':
          down_status = await this.check_down(now_y, now_x)
          right_status = await this.check_right(now_y, now_x)
          up_status = await this.check_up(now_y, now_x)

          if (down_status === true) {
            await this.go_down(now_y, now_x)
          } else if (right_status === true) {
            await this.go_right(now_y, now_x)
          } else if (up_status === true) {
            await this.go_up(now_y, now_x)
          } else {
            window.alert('fuck you')
            console.log('fuck you')
          }
          break
        case 'up':

          right_status = await this.check_right(now_y, now_x)
          left_status = await this.check_left(now_y, now_x)
          up_status = await this.check_up(now_y, now_x)

          if (right_status === true) {
            await this.go_right(now_y, now_x)
          } else if (left_status === true) {
            await this.go_left(now_y, now_x)
          } else if (up_status === true) {
            await this.go_up(now_y, now_x)
          } else {
            window.alert('fuck you')
            console.log('fuck you')
          }
          break
        case 'down':
          down_status = await this.check_down(now_y, now_x)
          right_status = await this.check_right(now_y, now_x)
          left_status = await this.check_left(now_y, now_x)

          if (down_status === true) {
            await this.go_down(now_y, now_x)
          } else if (right_status === true) {
            await this.go_right(now_y, now_x)
          } else if (left_status === true) {
            await this.go_left(now_y, now_x)
          } else {
            window.alert('fuck you')
            console.log('fuck you')
          }
          break
        default:
          window.alert(`fuck you what is this ? ${path}`)
          console.log('fuck you')
          clearInterval(this.timerId);
          break
      }
    }

  }

  check_up = async (y, x) => {
    let { data } = this.state
    let buffer = data[y - 1][x]
    if (buffer === 0) {
      return true
    }
    return false

  }
  check_down = async (y, x) => {
    let { data } = this.state
    let buffer = data[y + 1][x]
    if (buffer === 0) {
      return true
    }
    return false
  }
  check_right = async (y, x) => {
    let { data } = this.state
    let buffer = data[y][x + 1]
    if (buffer === 0) {
      return true
    }
    return false
  }
  check_left = async (y, x) => {
    let { data } = this.state
    let buffer = data[y][x - 1]
    if (buffer === 0) {
      return true
    }
    return false
  }

  go_up = async (y, x) => {

    let { data } = this.state
    data[y - 1][x] = 3
    console.log(`go up ${data[y - 1][x]}`)
    this.setState({
      data: data,
      now_y: y - 1,
      now_x: x,
      path: 'up'
    })

  }
  go_down = async (y, x) => {
    let { data } = this.state
    data[y][x + 1] = 3
    console.log(`go down ${data[y][x + 1]}`)
    this.setState({
      data: data,
      now_y: y + 1,
      now_x: x,
      path: 'down'
    })

  }
  go_right = async (y, x) => {
    let { data } = this.state
    data[y][x + 1] = 3
    console.log(`go right ${data[y][x + 1]}`)
    this.setState({
      data: data,
      now_y: y,
      now_x: x + 1,
      path: 'right'
    })

  }
  go_left = async (y, x) => {
    let { data } = this.state
    data[y][x - 1] = 3
    console.log(`go left ${data[y][x - 1]}`)
    this.setState({
      data: data,
      now_y: y,
      now_x: x - 1,
      path: 'left'
    })

  }


  render() {
    let { data } = this.state
    return (
      <Layout style={{ backgroundColor: 'white' }}>


        <table>
          {data.map((ele) => {
            return (
              <tr>
                {
                  ele.map((elee) => {
                    return (
                      <td>{elee}</td>
                    )
                  })
                }
              </tr>
            )
          })}
        </table>



      </Layout>
    )
  }
}


