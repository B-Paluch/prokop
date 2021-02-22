const { authJwt } = require("../middlewares");
const controller = require("../controllers/user");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            "access-Control-Allow-Origin","http://localhost:8081"
        );
        next();
    });

    app.get("/api/board/all", controller.allAccess);

    app.get("/api/board/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/board/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/board/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};