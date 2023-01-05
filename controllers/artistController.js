import axios from "axios";
import fs from "fs/promises";
import { URL } from "url"; // in Browser, the URL in native accessible on window
const __dirname = new URL(".", import.meta.url).pathname;
import { createObjectCsvWriter } from "csv-writer";

const getArtist = async (req, res) => {
  // const folderPath = __dirname.split("/").slice(0, -2).join("/");
  // const __dirname = new URL(".", import.meta.url).pathname;
  const folderPath = decodeURI(new URL("..", import.meta.url).pathname);

  try {
    // get the search params from http://localhost:5000/artist/:search
    const searchParams = await req.params.search;
    // get data from API via search params
    // default limit is 30 results
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchParams}&api_key=${process.env.API_KEY}&format=json`
    );

    // receive data for matching artists
    const data = await response.data;

    // specifying the search results in the data received
    const artistsArray = data.results.artistmatches.artist;
    // console.log("search results => ", artistsArray);
    const artistData = [];

    if (artistsArray.length > 0) {
      for (const artist of artistsArray) {
        const image_small_url = artist.image[0]["#text"]; // ["","", ...]

        // other solution via Object.values
        // const image_small = Object.values(artist.image[0])
        // const image_small_url = image_small[0]; //image_small.at(0) is also possible

        const image_large_url = artist.image[2]["#text"]; //large image_large.at(0)
        // ##################### with csvWriter #####################

        artistData.push({
          artist: artist.name,
          mbid: artist.mbid,
          url: artist.url,
          image_small: image_small_url,
          image: image_large_url,
        });

        console.log("ARTIST DATA => ", artistData);
      }

      const csvWriter = createObjectCsvWriter({
        path: `${folderPath}/search/${searchParams}.csv`,
        header: [
          { id: "artist", title: "ARTIST" },
          { id: "mbid", title: "MBID" },
          { id: "url", title: "URL" },
          { id: "image_small", title: "IMAGE_SMALL" },
          { id: "image", title: "IMAGE" },
        ],
      });

      csvWriter.writeRecords(artistData).then(() => {
        console.log(`File with artist search for ${searchParams} written.`);
      });

      // #########################################

      res.json(data.results.artistmatches.artist);
      // res.send("Data received");
    } else {
      // const readData = async () => {
      let path = `${folderPath}/mockData.json`;
      const objectData = fs
        .readFile(path, { encoding: "utf8" })
        .then((data) => {
          let object = JSON.parse(data); // json to object
          // console.log("OBJECT => ", object);
          return object;
        })
        .then((data) => {
          const csvWriter = createObjectCsvWriter({
            path: `${folderPath}/search/${searchParams}.csv`,
            header: [
              { id: "artist", title: "ARTIST" },
              { id: "mbid", title: "MBID" },
              { id: "url", title: "URL" },
              { id: "image_small", title: "IMAGE_SMALL" },
              { id: "image", title: "IMAGE" },
            ],
          });

          csvWriter.writeRecords(data).then(() => {
            console.log(`File with artist search for ${searchParams} written.`);
          });
          res.send(`Data received for search: ${searchParams}.`);
        })
        .catch((error) => {
          console.log("ERROR => ", error);
        });
    }
  } catch (error) {
    console.error(error);
  }
};

export { getArtist };
