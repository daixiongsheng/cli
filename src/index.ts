/**
 * @file index 入口
 * @author wangjun03@baijia.com
 */

import Midway from './exec/midway'
import Lib from './exec/lib'
import Serverless from './exec/serverless'
import Vue from './exec/vue'
import Vue3 from './exec/vue3'
import React from './exec/react'

const dxsCli = {
  /**
   * 当前版本号
   *
   * @type string
   */
  version: require('../package.json').version,

  /**
   * midwayjs项目
   */
  serve(projectName) {
    new Midway({ projectName }).exec()
  },

  /**
   * 创建一个库
   */
  lib(projectName) {
    new Lib({ projectName }).exec()
  },

  /**
   * 新建serverless项目
   */
  serverless(projectName) {
    new Serverless({ projectName }).exec()
  },

  /**
   * 创建一个 vue 项目的项目
   */
  vue(projectName) {
    new Vue({ projectName }).exec()
  },
  /**
   * 创建一个 vue3 项目的项目
   */
  vue3(projectName) {
    new Vue3({ projectName }).exec()
  },
  /**
   * 创建一个 react 项目的项目
   */
  react(projectName) {
    new React({ projectName }).exec()
  },
}

export default dxsCli
