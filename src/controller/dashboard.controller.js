const dashboardServices = require("../services/dashboard.services")

exports.getDashboardStats = async (req, res) => {
    try {

        const result = await dashboardServices.usersStats(req.user)
        // if()
        return res.status(200).json({
            success: true,
            message: "hello world",
            result
        })

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
