const User = require("./User");

const listUsers = async ({
    q,
    page = { limit: 5, offset: 1 },
    sort = { by: "", order: "desc" },
    filters,
}) => {
    let filter = {};
    let sorting = {};

    if (q) filter.first_name = { $regex: new RegExp(q, "i") };
    if (q) filter.last_name = { $regex: new RegExp(q, "i") };
    if (filters) filter = filters;
    if (sort.by == "first_name")
        sorting = sort.order == "asc" ? { first_name: 1 } : { first_name: -1 };
    if (sort.by == "last_name")
        sorting = sort.order == "asc" ? { last_name: 1 } : { last_name: -1 };

    const total = await User.find();

    const result = await User.find(filter)
        .sort(sorting)
        .skip((page.offset - 1) * page.limit)
        .limit(page.limit)
        .select("-password");

    return {
        listUsers: result,
        pageInfo: { Total_Users: total.length, ...page },
    };
};

module.exports = listUsers;
