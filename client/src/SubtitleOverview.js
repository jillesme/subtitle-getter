import React, { Component } from 'react';

let hearingAidImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADWUlEQVRYR8XXaehuUxQG8N8VyZxcN6FkVqaLkk+mDySSDAklw5Ukc6IMZUjGMn0whw9IpJBQpnwwpYRCppQQMmeeem7r3HbHef/n/d/76q5665y9117rOWut/az1LrCSZcEU/rfAR1PoLZfKGIDLcDr2x8sTPGyEHbA+fsEHeA//TINoLgAH4bEy8jk2x2/1viqOw6lYPODoC9yLa/HVXEAmAVi7vmLj+pKD8XgZ2goPYpcpvvA7LMHDk3QnAbgQCX/kpkpDnrfH81hYe3/iSTyHRGkN7IYjsGHpJBWn4NYhEEMAVsOnWIRvK/TfY128Ue+x9SJOxPsDhgPkIpyP+Pgb++KFvu4QgAObcF9VRnIu+TynDOSrk5Y/RtJwEm4rnRRmIvhXe2YIwI04rZR2xptYp0K8Fr7G1kh+O9msQv8ZXundgPtwVCke3q+HIQAvYY9y1OXxSDxQRhLayxvnl+ICrFJrSU2i0wHcFu/WXmx0YJYuDQH4sgoohvasg234u6hkq01XG9m7cXyzkPBvg48RYlsmQwB+RwrxERxamm0Yk46fav1OnDBQBz9W0XZb4ZPwSmyvPgYgRZJwPlTXKfotgBiIocgddRP6GH7AegPA/rM0FIEU2QZ1ZfauE1fj3HreEW/X8wF4YsBRIhMCGpUhAKni3XtFeFhFJAYDJDXRSYryYoSeI88g+uGOURkCcHNxfA7vhLfqGobf18SH2A5hwU42wa7INXx91GujMASgbUItEd2Ck+vsWbh+Po4m6c6HijetBpUo/FrUGs5YIZmmGSUlHTOm/eY9kkpP03l6RRBM244PwaPlqE1FmkyK8IrlBTHXQBKWC4FEJ8UVBstAkvdrmsYU33fVtZtqCmrBjo1kl9QssB9e633l0bi9bka2zkP4Yl4yBiDG0uk+mWA1fJF7nwnq59INkU0t0wAYM3Y2riulM3HDwIFQe35J0eg8MOawv59pOONYesQ7NSGnOFt5FvtUlDJTLJNZRCDG7sGxZTWzQXsrMry+WlTdtvil6rMCkJE9DSokFUn3fApb4oymM6Zw7/8/IhCbIaU47ppSP1XZO6a/OKsIdHb3qvE7Y1gnYcxczyv7BTjLFPSjmn9Lub7fFH/kL9ugzDoCk/xMXF/pAP4F43OoISHVpJcAAAAASUVORK5CYII=';

export default class SubtitleOverview extends Component {
  constructor (props) {
    super(props);

    this.displayMatchRate = this.displayMatchRate.bind(this);
    this.displaySubtitles = this.displaySubtitles.bind(this);
  }
  displayMatchRate (rating) {
    // 0 = 100% match, any higher is worse
    let display = String(100 - rating);
    return (<strong>{display}%</strong>);
  }
  displaySubtitles () {
    let list = this.props.results.map((subtitle, i) => {
      return (<li key={i}>
        <span>{subtitle.title}</span>
        <span> {this.displayMatchRate(subtitle.matchRate)}</span>
        <i> by {subtitle.author}</i>
        {subtitle.hi ? (<img src={hearingAidImage} />) : ''}
      </li>)
    });
    return list;
  }
  render () {
    return (
      <ul>
        {this.displaySubtitles()}
      </ul>
    );
  }
}