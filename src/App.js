import './App.css';
import Row from './Row';
import req from './req';
import Banner from './Banner';
import Nav from './Nav';

function App() {
  
  return (
    <div className="app">
      <Nav/>
      <Banner />
      <Row title="Netflix original" fetchUrl={req.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" fetchUrl={req.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={req.fetchTopRated}/>
      <Row title="Action Movies" fetchUrl={req.fetchActionMovies}/>
      <Row title="Comedy Movies" fetchUrl={req.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={req.fetchHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={req.fetchRomanceMovies}/>
      <Row title="Documentaries" fetchUrl={req.fetchDocumentaries}/>
    </div>
  );
}

export default App;
