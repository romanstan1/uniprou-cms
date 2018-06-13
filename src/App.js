import React, { Component } from 'react';
import * as firebase from 'firebase';


const brandNames = [
  'The Spectacle Store',
  'Aurora',
  'The Spectacle Store',
  'Jeff Banks',
  'The Spectacle Store',
  'The Spectacle Store',
  'Kylie Minogue',
  'The Spectacle Store',
  'Cath Kidston',
  'Collete Dinnigan',
  'Carla Zampatti',
  'Country Road',
  'Tommy Hilfiger',
  'Converse',
  'Superdry',
  'Alex Perry',
  'Balmain',
  'BOSS Orange'
]

const prices = [
  '79',
  '120',
  '89',
  '129',
  '79',
  '79',
  '169',
  '79',
  '129',
  '179',
  '59',
  '59'
]


const assets = (ctx => ctx.keys().map(ctx))(require.context('./images', true, /.jpg/))
const cleanedAssets = assets.map(str => str.substr(14).slice(0, -13))
const sunglasses = cleanedAssets.filter(str => str.slice(0,3) === 'sun')
const glasses = cleanedAssets.filter(str => str.slice(0,3) !== 'sun')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function constructGroups(dataArray, increaseBy) {
  return dataArray.reduce( (acc, curVal, index, array) => {

    const justTheId = curVal.substr(increaseBy).slice(0, 8)
    const justTheAngle = curVal.substr(increaseBy + 9).slice(0, -8)
    const indexOfGroup = acc.findIndex( each => each.id === justTheId)
    if(indexOfGroup < 0) { // unique therefore push a new template to the accumulator
      acc.push({
        brand: brandNames[getRandomInt(0, 17)],
        price: prices[getRandomInt(0, 11)],
        id: justTheId,
        images: [curVal + '.jpg']
      })
    } else { // not-unique therefore push to the group
      if(justTheAngle === 'front') acc[indexOfGroup].images.unshift(curVal + '.jpg')
      else acc[indexOfGroup].images.push(curVal + '.jpg')
    }

    return acc
  }, [])
}



const groupedSunglasses = constructGroups(sunglasses, 4)
const groupedGlasses = constructGroups(glasses, 0)

// console.log('groupedGlasses: ', groupedGlasses)
// console.log('groupedSunglasses: ', groupedSunglasses)



const jsonSunglasses = JSON.stringify(groupedGlasses)
console.log(jsonSunglasses)






class App extends Component {

  state = {value: ''}

  submitJson = () => {
    const dbRef = firebase.database().ref()
    const categories = JSON.parse(this.state.value)
    dbRef.set(categories)
    console.log("Must've worked!")
  }

  handleTextInput = (e) => {
    const value = e.target.value
    this.setState({value})
  }

  render() {
    return (
      <div className="App">
        <h3>Use with the utmost care!</h3>
        <h4>That had better be valid json...</h4>
        <div>
          <textarea onChange={this.handleTextInput} value={this.state.value} rows="15" cols="50">
          </textarea>
        </div>
        <div className='SubmitButton' onClick={this.submitJson}>
          Submit</div>
      </div>
    );
  }
}

export default App;
