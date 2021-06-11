module.exports = {
  module: {
    rules: [
      {
        test: /\.(mp3|wav)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
}
