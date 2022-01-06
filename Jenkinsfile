def notifyLINE(status) {
    def token = "4KTgSkRacd4cMha54QmOsFHafAEZ2TWaJFnfLRXLFPK"
    def jobName = env.JOB_NAME +' '+env.BRANCH_NAME
    def buildNo = env.BUILD_NUMBER
      
    def url = 'https://notify-api.line.me/api/notify'
    def message = "${jobName} Build #${buildNo} ${status} \r\n"
    sh "curl ${url} -H 'Authorization: Bearer ${token}' -F 'message=${message}'"
}

pipeline {
  agent any
  /*environment {
        // Specify your environment variables.
        APP_VERSION = '1'
    }*/
  stages {
    stage('build') {
      when{
        changeset "package.json"
      }
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