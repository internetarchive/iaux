export class MockResponseGenerator {
  generateMockSearchResponse(params) {
    const fieldsAsString = params.fields.join(',');

    return {
      responseHeader: {
        status: 0,
        QTime: 1459,
        params: {
          query: params.query,
          qin: params.query,
          fields: fieldsAsString,
          wt: "json",
          sort: params.sort,
          rows: params.rows,
          start: params.start
        }
      },
      response: {
        numFound: 12345,
        start: 0,
        docs: [
          { identifier: "foo" },
          { identifier: "bar" },
        ]
      }
    }
  }

  generateMockMetadataResponse(identifier) {
    return {
      created: 1586477049,
      d1: "ia600201.us.archive.org",
      d2: "ia800201.us.archive.org",
      dir: "/27/items/rss-383924main_TWAN_09_04_09",
      files: [
        {
          name: "foo.jpg",
          source: "derivative",
          format: "Thumbnail",
          original: "foo.mp4",
          md5: "48067b43a547d3e90cb433a04ba84d5d",
          mtime: "1256675427",
          size: "1135",
          crc32: "40870038",
          sha1: "6445c2a6f51c8314c1872ec1f7daf33c5cfabd06"
        },
        {
          name: "bar.jpg",
          source: "derivative",
          format: "Thumbnail",
          original: "bar.mp4",
          md5: "5bf69912d7b796fe309cde32e61230bc",
          mtime: "1256675429",
          size: "6329",
          crc32: "ba5f361a",
          sha1: "cddab0e2daab29978e5efdeff735240a44aa7c80"
        },
      ],
      files_count: 2,
      item_last_updated: 1463797130,
      item_size: 99872691,
      metadata: {
        feed_id: "/0/rss_feeds/NASACast_Video/nasacast_video:sts128_landing/NASAcast_vodcast.rss",
        mediatype: "movies",
        title: "NASA TV's This Week @NASA, September 4",
        description: "NASA TV's This Week @NASA, September 4",
        creator: "NASA",
        source: "http://www.nasa.gov/multimedia/podcasting/twan_09_04_09.html",
        date: "9/4/2009",
        year: "2009",
        rights: "Public Domain",
        language: "en-us",
        updater: "BonnieReal",
        updatedate: "2009-10-27 20:23:01",
        identifier,
        uploader: "bonnie@archive.org",
        addeddate: "2009-10-27 20:25:55",
        publicdate: "2009-10-27 20:41:27",
        collection: [
          "nasa",
          "nasacastvideo"
        ],
        backup_location: "ia903604_7"
      },
      server: "ia800201.us.archive.org",
      uniq: 162444403,
      workable_servers: [
        "ia800201.us.archive.org",
        "ia600201.us.archive.org"
      ]
    }
  }
}
