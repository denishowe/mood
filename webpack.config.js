module.exports =
{
    mode: "development",    // default production
    entry: ['./src/index.js'],
    module:
    {
        rules:
        [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use:
                [
                    {
                        loader: 'babel-loader',
                        options: { presets: ["env", "react", "es2015-ie"] }
                    }
                ]
            }
        ]
    }
};
