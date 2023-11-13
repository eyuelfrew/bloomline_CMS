<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BloomLine</title>
    <link rel="stylesheet" href="styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
    <script src="https://kit.fontawesome.com/b54795a7d1.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
</head>

<body>

    <div class="container-fluid d-flex vh-100 align-items-center justify-content-center">

        <form action="" method="post">
            <div class="row">
                <div class="card p-5 rounded-5 shadow-lg" style="width: 40rem">
                    <div class="card-header bg-white text-center mt-3">
                        <h3><i class="fa fa-users px-3"></i>Users Register</h4>
                    </div>

                    <div class="card-body mt-5">
                        <div class="row">
                            <input type="text" name="first_name" class="form-control text-center fs-3"
                                placeholder="First Name" />
                        </div>
                        <div class="row mt-3">
                            <input type="text" name="last_name" class="form-control text-center fs-3"
                                placeholder="Last Name" />
                        </div>
                        <div class="row mt-3">
                            <input type="email" name="email" class="form-control text-center fs-3"
                                placeholder="email" />
                        </div>
                        <div class="row mt-3">
                            <input type="password" name="password" class="form-control text-center fs-3"
                                placeholder="Password" />
                        </div>
                        <div class="row mt-3">
                            <input type="password" name="repeat_password" class="form-control text-center fs-3"
                                placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div class="row px-5 mb-3 text-center">
                        <button class="btn btn-primary fs-4 fw-bold" type="submit" name="submit ">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</body>

</html>

<!-- <div
      class="container-fluid d-flex vh-100 align-items-center justify-content-center"
    >
      <form action="" method="post">
        <div class="row">
          <div class="card p-5 rounded-5 shadow-lg" style="width: 40rem">
            <div class="card-header bg-white text-center mt-3">
              <h1><i class="fa fa-users px-3"></i>admin's login</h1>
            </div>
            <div class="card-title">
              <div class="row"></div>
            </div>
            <div class="card-body mt-5">
              <div class="row">
                <input
                  type="text"
                  class="form-control text-center fs-3 fw-bold"
                  placeholder="email"
                />
              </div>
              <div class="row mt-3">
                <input
                  type="password"
                  class="form-control text-center fs-3 fw-bold"
                  placeholder="password"
                />
              </div>
            </div>
            <div class="row px-5 mb-3 text-center">
              <button class="btn btn-primary fs-4 fw-bold">Login</button>
            </div>
          </div>
        </div>
      </form>
    </div> -->