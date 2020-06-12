exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("users")
        .truncate()
        .then(function () {
            // Inserts seed entries
            return knex("users").insert([
                {
                    username: "username",
                    password: "password",
                    department: "lab",
                },
                {
                    username: "username1",
                    password: "password1",
                    department: "lab",
                },
                {
                    username: "username2",
                    password: "password2",
                    department: "lab",
                },
            ]);
        });
};
