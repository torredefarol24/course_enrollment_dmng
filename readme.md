## Installation Steps

1. Ensure database is running, for this demo, mongoDB is used

2. Provide environment vals

```
$ yarn create_env
```

3. POPULATE THE NEWLY CREATED ENV FILE

4. Install packages

```
$ yarn install
```

\*\* This step is configured to automatically install packages, build from source, and run tests.

-- For further exploration, (OPTIONAL)

- Building it from source

```
$ yarn build
```

- Running Tests

```
$ yarn test
```

---

5. Run Server

```
$ yarn start
```

---

# TEST / CORNER CASES

- Request Validation for fields in CREATE_COURSE
- Request Validation for data types in CREATE_COURSE
- Checking for existing Course, to match with ID in GET_COURSE_BY_ID
- Request Validation for fields in CREATE_ENROLLMENT
- Request Validation for data types in CREATE_ENROLLMENT
- Checking for Valid Course in CREATE_ENROLLMENT
- Filter GET_COURSES API by 'price', 'instructor', 'duration'

---

# APIS

## 1. Create Courses

- Endpoint: http://localhost:{{ PORT }}/api/v1/courses
- Req Method: POST
- Req Body:

```
{
	"title": "New title",
	"description": "The other description",
	"instructor": "Ron",
	"duration":60,
	"price": 30
}
```

- Success response:

```
{
	"message": "Course Created",
	"data": {
		"course": {
			"title": "New title",
			"description": "The other description",
			"instructor": "Ron",
			"duration": 60,
			"price": 30,
			"_id": "655da3b491d76d50a416e644",
			"createdAt": "2023-11-22T06:46:12.221Z",
			"updatedAt": "2023-11-22T06:46:12.222Z",
			"__v": 0
		}
	}
}
```

## 2. GET COURSES

- Endpoint http://localhost:{{ PORT }}/api/v1/courses (ALL)
- Endpoint http://localhost:{{ PORT }}/api/v1/courses?price=500 (filter by price)
- Endpoint http://localhost:5155/api/v1/courses?instructor=John&price=500 (filter by price & instructor)
- Endpoint http://localhost:5155/api/v1/courses?duration=240 (filter by duration)
- Req Method: GET
- Success response:

```
{
	"message": "Courses Fetched",
	"data": {
		"courses": [
			{
				"_id": "655d92d7b69512f79e5f103c",
				"title": "Random title",
				"description": "The other description",
				"instructor": "John",
				"duration": 300,
				"price": 25,
				"createdAt": "2023-11-22T05:34:15.137Z",
				"updatedAt": "2023-11-22T05:34:15.137Z",
				"__v": 0
			},
			{
				"_id": "655d92b4b69512f79e5f1039",
				"title": "Another title",
				"description": "some other description",
				"instructor": "Mark",
				"duration": 30,
				"price": 5.5,
				"createdAt": "2023-11-22T05:33:40.385Z",
				"updatedAt": "2023-11-22T05:33:40.385Z",
				"__v": 0
			},
			...
		]
	}
}
```

## 3. GET COURSE BY ID

- Endpoint http://localhost:{{ PORT }}/api/v1/courses/{{ COURSE_ID }}
- Req Method: GET
- Success response:

```
{
	"message": "Course Fetched",
	"data": {
		"course": {
			"_id": "655d92d7b69512f79e5f103c",
			"title": "Random title",
			"description": "The other description",
			"instructor": "John",
			"duration": 300,
			"price": 25,
			"createdAt": "2023-11-22T05:34:15.137Z",
			"updatedAt": "2023-11-22T05:34:15.137Z",
			"__v": 0
		}
	}
}
```

---

## 4. CREATE ENROLLMENT

- Endpoint http://localhost:{{ PORT }}/api/v1/enrollment
- Req Method: POST
- Req Body

```
{
	"studentName": "Tom",
	"courseId": "655d92d7b69512f79e5f103c",
	"enrollmentDate": "2023-11-22T05:43:57.264Z"
}
```

- Success Response

```


{
	"message": "Enrollment Created",
	"data": {
		"enr": {
			"studentName": "Tom",
			"enrollmentDate": "2023-11-22T05:43:57.264Z",
			"courseId": "655d92d7b69512f79e5f103c",
			"_id": "655d98af3fba56d341c97993",
			"createdAt": "2023-11-22T05:59:11.346Z",
			"updatedAt": "2023-11-22T05:59:11.346Z",
			"__v": 0
		}
	}
}
```
