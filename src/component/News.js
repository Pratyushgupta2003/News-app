import React, { useState , useEffect} from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props)=> {

  const [articles, setArticles] = useState([]);
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  // document.title = `${this.capitalizeFLetter(props.category)}-Newsmonkey`


  const capitalizeFLetter = (string) => {
    return string[0].toUpperCase() +
      string.slice(1);
  }


  const update = async ()=> {
    props.setprogress(10)
    setLoad(true);
    console.log(props.api);
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
    // `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=461c2d13cfc84dd395cb70f8589cfa85&page=${this.state.page}&pageSize=${props.pageSize}`;
    let data = await fetch(URL);
    props.setprogress(30)
    let parsedata = await data.json();
    props.setprogress(70)
    setArticles(articles.concat(parsedata.articles));
    setLoad(false);
    setTotalResult(parsedata.articles);
    props.setprogress(100)
  }

  useEffect(() => {
    update(); 
    // eslint-disable-next-line
}, [])


  const fetchMoreData = async () => {
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
    // `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=461c2d13cfc84dd395cb70f8589cfa85&page=${this.state.page}&pageSize=${props.pageSize}`;
    let data = await fetch(URL);
    let parsedata = await data.json();
    setPage(page+1)
    setArticles(articles.concat(parsedata.articles));
    setTotalResult(parsedata.totalResult);
  };


    
    // const articles = this.state.articles;
    return (
<>
        <h1 className="text-center my-3">Newsmonkey - {capitalizeFLetter(props.category)} Top Headlines</h1>
        
        { load && <Spinner />}

      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={totalResult > articles.length}
          loader={<Spinner/>}
        >
        
        <div className="container">
        <div className="row">
          {articles.map((element) =>{
            return <div className="col-md-4" key={element.url}>
              <NewsItems title={!element.title ? "" : element.title.slice(0, 45)}
                disc={!element.description ? "" : element.description.slice(0, 88)}
                newsurl={!(element.urlToImage) ? "https://img.mlbstatic.com/mlb-images/image/upload/t_2x1/t_w1536/mlb/xe2ri4sss5hvinfejqii.jpg" : element.urlToImage}
                url={!element.url ? "" : element.url}
                Author={element.author} date={element.publishedAt}
                place={element.source.name} />
            </div>
          })
          }
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark " onClick={this.handlePrevBtn}>&larr; Prev</button>
          <button disabled={Math.ceil(this.state.totalResult / props.pageSize) < (this.state.page + 1)} type="button" className="btn btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button>
        </div> */}
        
      
      
</>
    )
  
  
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
};

News.defaultProps = {
  pageSize: 21,
  country: 'in',
  category: 'general'
}

export default News