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

  const capitalizeFLetter = (string) => {
    return string.charAt(0).toUpperCase() +
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
    setArticles(parsedata.articles);
    setLoad(false);
    setTotalResult(parsedata.articles);
    props.setprogress(100)
  }

  useEffect(() => {
      document.title = `${capitalizeFLetter(props.category)}-Newsmonkey`
    update(); 
    // eslint-disable-next-line
}, [])

  const fetchMoreData = async () => {
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page+1}&pageSize=${props.pageSize}`;
    // `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=461c2d13cfc84dd395cb70f8589cfa85&page=${this.state.page}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(URL);
    let parsedata = await data.json();
    setArticles(articles.concat(parsedata.articles));
    setTotalResult(parsedata.totalResult);
  };

    return (
<>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Newsmonkey - {capitalizeFLetter(props.category)} Top Headlines</h1>
        
        { load && <Spinner />}

      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={totalResult !== articles.length}
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
          }) }
          </div>
        </div>
        </InfiniteScroll>
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