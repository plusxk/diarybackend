def notifyLINE(status) {
    def token = "ALgop9NLwRpYtMglonMhqRKepRnRdcBXtviO8U1ry5J"
    def jobName = env.JOB_NAME
    def buildNo = env.BUILD_NUMBER
      
    def url = 'https://notify-api.line.me/api/notify'
    def message = "${jobName} Build #${buildNo} ${status}"
    bat "curl -X POST -H \"Authorization: Bearer ${token}\" -F \"message=${message}\" ${url}"
}

pipeline {
  agent any
  /*environment {
        // Specify your environment variables.
        APP_VERSION = '1'
    }*/
  stages {
    stage('build') {
      steps {
        echo 'Install dependencies state!!'
        bat 'npm install'
      }
    }
    stage('test') {
      steps {
        echo 'Unit test state!!'
        bat 'npm test'
      }
    }
    /*stage('Push') {
        steps {
            
        }
    }*/
  }
  post{
    success{
        notifyLINE("succeed")
    }
    failure{
        notifyLINE("failed")
    }
  }
}