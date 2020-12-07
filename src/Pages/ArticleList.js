import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const { confirm } = Modal

const ArticleList = props => {
  const [list, setList] = useState([])

  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(res => {
      setList(res.data.list)
    })
  }

  // 删除文章
  const delArticle = (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗？',
      content: '如果点击OK按钮，文章将从数据库里面删除',
      onOk() {
        axios(servicePath.delArticle + id,{withCredentials:true}).then(res=>{
          message.success('文章删除成功')
          getList()
        })
      },
      onCancel() {
      }
    })
  }

  // 修改文章跳转
  const updateArticle = (id) =>{
    props.history.push('/index/add/'+id)
  }

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => {
          return (
            
            <List.Item>
              <Row className="list-div">
                <Col span={8}>{item.title}</Col>
                <Col span={4}>{item.typeName}</Col>
                <Col span={4}>{item.addTime}</Col>
                <Col span={4}>{item.view_count}</Col>
                <Col span={4}>
                  <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;
                  <Button onClick={()=>delArticle(item.id)}>删除</Button>
                </Col>
              </Row>
            </List.Item>
          )
        }}
      ></List>
    </div>
  )
}
export default ArticleList
