

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
 
}