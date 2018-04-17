import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {getDecks} from '../utils/api'
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
class StartQuiz extends Component {

  state = {
    questionIndex :0,
    showQuestion : true,
    correctCount : 0,
  };

  componentDidMount(){
    this.props.fetchData();
    clearLocalNotification()
      .then(setLocalNotification);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.deckList !== prevProps.deckList){
      this.setState({
        questions:this.props.deckList[this.props.navigation.state.params.deckId].questions
      });
    }
  }

  startOver = () =>{
    this.setState({
      questionIndex :0,
      showQuestion : true,
      correctCount : 0,
    });

  }
  render() {
    if(typeof this.state.questions === "undefined"){
      return (<View style={{flex: 1}}><Text>"Loading.. "</Text></View>)
    }
    return (
      <View style={{flex: 1}}>
      <Text>{this.state.questionIndex +1}/{this.state.questions.length}</Text>
      <View style={{flex: 1}}>
      { this.state.questionIndex===this.state.questions.length
        ? (
          console.log("correct answers"+this.state.correctCount),
          <View style={{flex: 1}}>
          <Text style={styles.heading}>{(this.state.correctCount/this.state.questions.length)*100}%</Text>
          <TouchableOpacity  style={styles.button}
            onPress={this.startOver}>
            <Text style={styles.buttontext} >Start Over</Text>
            </TouchableOpacity>
          <TouchableOpacity  style={styles.button}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.buttontext}>Done</Text>
          </TouchableOpacity>
          </View>
        )
        : ( this.state.showQuestion ? (
          <View style={{flex: 1}}>
          <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].question}</Text>
          <TouchableOpacity style={styles.button}
          onPress={()=>{
            this.setState({
              showQuestion:false})
            }
          }>
          <Text style={styles.buttontext}>Show Answer</Text>
          </TouchableOpacity>
          </View>
        )
        :
        (
          <View style={{flex: 1}}>
          <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].answer}</Text>
          <TouchableOpacity style={styles.button}
          onPress={()=>{
            this.setState({
              showQuestion:true,
              correctCount:this.state.correctCount+1,
              questionIndex : this.state.questionIndex+1})
            }
          }>
          <Text style={styles.buttontext}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{
            this.setState({
              showQuestion:true,
              questionIndex:this.state.questionIndex+1})
            }}>
            <Text style={styles.buttontext}>Wrong</Text>
            </TouchableOpacity>
            </View>
          ))}


          </View>
        </View>
      )
    }
    }

  const styles =  StyleSheet.create({
      heading:{
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 150,
      },
      cardText:{
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 150,
      },
      button:{
        padding : 2,
        justifyContent: 'center',
        alignItems: 'center',

        height: 60
      },
      buttontext: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        padding : 4,
        textAlign: 'center',
        borderWidth : 1,
        borderRadius: 10
      },
    });

    const mapStateToProps = (state) =>  {
      return {
        deckList : state,
      }
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        fetchData: () => dispatch(getDecks())
      };
    };


    export default connect(mapStateToProps,mapDispatchToProps)( StartQuiz)
