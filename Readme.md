** JSON API and a mockup
   * The JSON API returns some data that looks like this:
            [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
        ]

    * The mockup looks like this:
        <img src="src/img/s_thinking-in-react_ui.png" alt="mockup preview" width="250px">


Step 1: Break the UI into component hierarchy 

    * FilterableProductTable    
        * SearchBar
        * ProductTable
            * ProductCategoryRow
            * ProductRow

Step 2: Build a static version in React

    - "Top-down" easier
    - "bottom-up" larger projects

Step 3: Find the minimal but complete representation of UI state

    DRY (Don’t Repeat Yourself).

        -- all of the pieces of data in this example application:

            The original list of products
            The search text the user has entered
            The value of the checkbox
            The filtered list of products

        -- Which of these are state? Identify the ones that are not:

            Does it remain unchanged over time? If so, it isn’t state.
            Is it passed in from a parent via props? If so, it isn’t state.
            Can you compute it based on existing state or props in your component? If so, it definitely isn’t state!


    The original list of products is passed in as props, so it’s not state.
    The search text seems to be state since it changes over time and can’t be computed from anything.
    The value of the checkbox seems to be state since it changes over time and can’t be computed from anything.
    The filtered list of products isn’t state because it can be computed by taking the original list of products and filtering it according to the search text and value of the checkbox.

    Props are used for communication between components, passing data from parent to child, while State is used to manage a component's internal state and make it mutable, triggering re-renders when the state changes. Both Props and State are fundamental concepts in React for building dynamic and interactive user interfaces.

Step 4: Identify where your state should live

    * One-way data flow,  Parent -->--passing data--> child component


    1. Identify components that use state:
        ProductTable needs to filter the product list based on that state (search text and checkbox value).
        SearchBar needs to display that state (search text and checkbox value).
    2. Find their common parent: The first parent component both components share is FilterableProductTable.
    3. Decide where the state lives: We’ll keep the filter text and checked state values in FilterableProductTable.

    So the state values will live in FilterableProductTable.

Step 5: Add inverse data flow

    support data flowing the other way