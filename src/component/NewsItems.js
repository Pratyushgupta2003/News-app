import React from 'react'

const NewsItems = (props)=> {

    // let { title, disc, newsurl , url , Author , date , place} = this.props;
    return (
      <div className="card my-2" >
        {/* <span className="badge bg-secondary">New</span> */}
        <div style={{position:'absolute',
      top:'-1.5%',
      right:0}}>
        <span className=" badge rounded-pill bg-danger" >
    {props.place}</span>
    </div>
        {/* <h5>Example heading <span className="badge bg-secondary">New</span></h5> */}
        <img src={props.newsurl} className="card-img-top" alt="/" />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.disc}...</p>
          <p className="card-text"><small className="text-body-secondary">publised by {props.Author} on {new Date(props.date).toUTCString()}</small></p>
          <a rel='noreferrer' href={props.url} target='_blank' className="btn btn-primary">Read more</a>
        </div>
        
      </div>
    )
  }

export default NewsItems