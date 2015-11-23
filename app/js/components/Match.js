import React, {Component} from 'react'

import tinder from 'jstinder'

const t = React.PropTypes

var today = new Date()
function getAge (dateString) {
  var birthDate = new Date(dateString)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default class Match extends Component {
  constructor (props) {
    super(props)
    this.state = {
      img: 0
    }
    this.onLike = this.onLike.bind(this)
    this.onPass = this.onPass.bind(this)
    this.onPrevious = this.onPrevious.bind(this)
    this.onNext = this.onNext.bind(this)
  }
  onLike (id) {
    return function (e) {
      tinder.like(id)
        .then((info) => {

        })
    }
  }
  onPass (id) {
    return function (e) {
      tinder.pass(id)
        .then((info) => {

        })
    }
  }
  onPrevious (e) {
    if (this.state.img > 0) {
      this.setState({img: this.state.img - 1})
    }
  }
  onNext (e) {
    if (this.state.img < this.props.match.photos.length) {
      this.setState({img: this.state.img + 1})
    }
  }
  render () {
    return (
      <div className='Match' style={{backgroundImage: `url(${this.props.match.photos[this.state.img].url})`}}>
        <button onClick={this.onLike(this.props.match._id)}><i className='icon-heart'/> like</button>
        <button onClick={this.onPass(this.props.match._id)}><i className='icon-heart-broken'/> unlike</button>
        <button disabled={this.state.img === 0} onClick={this.onPrevious}><i className='icon-arrow-left'/> previous</button>
        <button disabled={this.state.img === (this.props.match.photos.length - 1)} onClick={this.onNext}><i className='icon-arrow-right'/> next</button>
        { this.props.match.bio ? <div className='bio'>{this.props.match.bio}</div> : '' }
        <div className='info'>{this.props.match.name} {getAge(this.props.match.birth_date)}</div>
        <div className='friends'>
          {this.props.match ? this.props.match.common_friends.map((friend, i) => {
            if (friend) {
              return (<img key={i} src={`http://graph.facebook.com/${friend}/picture?type=square`} />)
            }
          }) : ''}
        </div>
      </div>
    )
  }
}

Match.propTypes = {
  match: t.object.isRequired
}

Match.defaultProps = {
}