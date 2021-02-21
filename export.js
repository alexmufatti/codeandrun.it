// Using synchronous function versions makes things a bit simpler and
// is perfectly suitable for a one-time-use migration script
const { readdirSync, readFileSync } = require('fs')
const { basename, dirname } = require('path')

// I have my posts in the `content/codebase` directory
const listPosts = () => {
    return readdirSync(`${__dirname}/content/posts`)
        .map(el => `${__dirname}/content/posts/${el}/index.md`)
}

// Creates a post in Ghost's JSON format described here:
// https://ghost.org/docs/api/v3/migration/#json-file-structure
const createPost = (id, image, title, slug, publishedAt, markdown) => {
    return {
        "id": id,
        "title": title,
        "slug": slug,
        "feature_image": image,
        "mobiledoc": JSON.stringify({
            version: '0.3.1',
            markups: [],
            atoms: [],
            cards: [['markdown', {cardName: 'markdown', markdown }]],
            sections: [[10, 0]]
        }),
        "status": "published",
        // These dates end up somewhat of an approximation, because
        // I would have to extract them from the .md files' metadata
        // which is more work and of little use in my case
        "published_at":  publishedAt,
        "created_at":  publishedAt,
        "updated_at":  publishedAt,
    }
}

// Extracts post data from the Markdown files used in Hugo
//
// The original Hugo files look somewhat like this:
//
// <example lang="hugo">
//   +++
//   title = "Hello world"
//   slug = "hello-world-url"
//   date = "2019-04-16"
//   +++
//   Post content is here...
// </example>
const createPostDataFromFileContent = (id, filename, fileContent) => {
  const contentRegexp = /^---((.|\n)+)---((.|\n)+)$/m
    const titleRegexp = /title: (.+)/
    const dateRegexp = /date: (.+)/
    const imageRegexp = /images: \["(.[^"]+)"/
    
    const figurelink = /{{< figurelink src="(.[^"]+)"\s*(?:title="(.[^"]+)")?\s*>}}/g;
    const figurelinksb = `![$2](https://codeandrun.it/content/images/import/$1)`;

    const stravalink = /{{< strava id=(.[^\s]+)\s*embedId=(.[^\s]+)\s*>}}/g;
    const stravasb = `<iframe height='405' width='590' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/$1/embed/$2'></iframe>`

    const contentMatches = fileContent.match(contentRegexp)

    const header = contentMatches[1]
    const titleMatches = header.match(titleRegexp)
    const dateMatches = header.match(dateRegexp)
    const imageMatches = header.match(imageRegexp)

    const image = imageMatches ? "https://codeandrun.it/content/images/import/"+imageMatches[1] : ""

  const title = titleMatches[1]
    const date = (new Date(dateMatches[1])).getTime()
    const markdown = contentMatches[3].trim().replace(figurelink, figurelinksb).replace(stravalink,stravasb);
    
     


  // In my case, the filenames are the same as the slug
    const slug = dirname(filename).split('/').reverse()[0]

    return createPost(
        id,
        image,
        title,
        slug,
        date,
        markdown
    )
}

const postsData = listPosts()
    .map((filename) => ({ filename, fileContent: readFileSync(filename).toString() }))
    .map(({ filename, fileContent }, i) => createPostDataFromFileContent(i, filename, fileContent))

// Prints the posts in JSON format for Ghost, which can be used to debug
// or create a .json file to import into Ghost, like so:
//
// <example lang="shell">
//   node hugo-to-ghost.js > ghost.json
// </example>
console.log(JSON.stringify(
        {
        "meta": {
            "exported_on":1408552443891,
            "version":"3.1.0",
        },
        "data": {
            "posts": postsData,

        },
    }
))
