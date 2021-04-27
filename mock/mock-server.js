/* eslint-disable */
const fs = require('fs-extra')
const path = require('path')
const JSON5 = require('json5')
const Mock = require('mockjs')
const { delay } = require('./utils.js')
const express = require('express');
const app = express();

// 接口前缀
const mockUrlMatch = /^\/api\//

async function getMockData(dataFilePath, method) {
  const fileJsonPath = `${dataFilePath}.json`
  const fileJsonExist = await fs.pathExists(fileJsonPath)
  if (fileJsonExist) {
      return fs.readFile(fileJsonPath, 'utf8')
  }
  console.error('------- ERROR ------')
  return Promise.reject(new Error('没有找到对应mock数据文件'))
}

module.exports = app => {
  // 只有环境变量是mock的情况才会进入
  if (process.env.NODE_ENV === 'mock') {
      console.info('开启mock数据调试...')
      app.all(mockUrlMatch, async (req, res) => {
          console.log('MOCK', req)
          const { method, originalUrl } = req
          console.info(`本地数据请求：mockUrlMatch [${method}] ${originalUrl}`)
          try {
              // 响应延迟500ms，模拟请求
              await delay(200)
              const dataFilePath = originalUrl
                  .replace(mockUrlMatch, `${path.join(process.cwd(), 'mock')}$&`)
                  .replace(/\?.*$/, '')
              let data = await getMockData(dataFilePath, method)

              res.status(200).append('Access-Control-Allow-Origin', true)
              try {
                  data = JSON5.parse(data)
              } catch (e) {
                  const errMsg = `local mock json data parse error (本地测试数据JSON解析错误): ${dataFilePath}`
                  throw new Error(`${errMsg}\n${e}`)
              }
              res.json(data)
          } catch (err) {
              res.status(500).send(err.stack)
          }
      })
  }
}