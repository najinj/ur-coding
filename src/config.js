const apiUrl = (page, date) =>{
    return process.env.NODE_ENV !== "test" ?  `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=10&page=${page}` :"..__tests__/data"; 
}

export default apiUrl;