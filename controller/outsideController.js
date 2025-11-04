const axios = require("axios")

const fetchblogs = async(req,res)=>{
    const dish = req.params.dish
    const query = `${dish} recipe blog`;
    try {
        const response = await axios.get("https://www.googleapis.com/customsearch/v1",{
            params:{
                key:process.env.SEARCH_API_KEY,
                cx:process.env.SEARCH_ENGINE_ID,
                q:query
            }
        });
        const blog = response.data.items.map(item=>({
            title:item.title,
            snippet:item.snippet,
            link:item.link,
            image:item.pagemap?.cse_image?.[0]?.src || null,
        }));
        res.json({dish,blog});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Failed to fetch recipe blogs"})
    }
}

const fetchvideos = async(req,res)=>{
    const dish = req.params.dish;
    const query =`${dish} recipe`;

    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search",{
            params:{
                part:"snippet",
                q: query,
                type:"video",
                maxResults:5,
                key:process.env.SEARCH_API_KEY
            }
        });

        const videos = response.data.items.map(item=>({
            title:item.snippet.title,
            channel:item.snippet.channelTitle,
            thumbnail:item.snippet.thumbnails.medium.url,
            embedUrl:`https://www.youtube.com/embed/${item.id.videoId}`
        }));

        res.json({dish,videos});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch YouTube videos"})
    }
}

module.exports = {
    fetchblogs,
    fetchvideos
}