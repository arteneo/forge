const path = require("path");

exports.onCreateWebpackConfig = (args) => {
    args.actions.setWebpackConfig({
        resolve: {
            alias: {
                "@arteneo/forge": path.resolve(__dirname, "../src/"),
            },
        },
    });
};
