pipeline {
  agent any
  /*environment {
        // Specify your environment variables.
        APP_VERSION = '1'
    }*/
  stages {
    stage('build') {
      steps {
        echo 'Build state!!'
        bat 'npm install'
        bat 'npm start'
      }
    }
    stage('test') {
      steps {
        echo 'Unit test state!!'
        bat 'npm test'
      }
    }
    stage('Push') {
        steps {
            
        }
    }
  }
}