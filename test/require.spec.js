'use strict'

/**
 * require-stack
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const requireStack = require('../index')
const chai = require('chai')
const path = require('path')
const expect = chai.expect

describe('Require', function () {

  it('should not build complete path for node modules', function () {
    const modulePath = requireStack.getRequirePath('syntax-error')
    expect(modulePath).to.equal('syntax-error')
  })

  it('should build complete path for local modules', function () {
    const modulePath = requireStack.getRequirePath('./modules/index')
    expect(modulePath).to.equal(path.join(__dirname,'./modules/index'))
  })

  it('should build complete path for local modules with complete path', function () {
    const modulePath = requireStack.getRequirePath(path.join(__dirname,'./modules/index'))
    expect(modulePath).to.equal(path.join(__dirname,'./modules/index'))
  })

  it('should return syntax errors under a given file', function () {
    const fn = function () {
      return requireStack('./modules/index')
    }
    expect(fn).to.throw(/ParseError/)
  })

  it('should return syntax errors for when passing directory name assuming to load index file', function () {
    const fn = function () {
      return requireStack('./modules')
    }
    expect(fn).to.throw(/ParseError/)
  })

  it('should all other errors occured during requiring a module', function () {
    const fn = function () {
      return requireStack('./modules/foo.js')
    }
    expect(fn).to.throw(/Cannot find module/)
  })

})