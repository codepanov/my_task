## What is the difference between Component and PureComponent? give an example where it might break my app.
The main difference between `Component` and `PureComponent` is that `PureComponent` implements a shallow comparison of props and state, and only re-renders if they have changed. `Component`, on the other hand, always re-renders when it receives new props or a state, regardless of whether they have actually changed.

One example where using PureComponent might break an app is when we use complex data structures as props or state that cannot be properly compared with a shallow comparison. In such case, we might need to implement a custom `shouldComponentUpdate` method or use a more advanced optimization technique like memoization with `useMemo` and `useCallback` hooks.

## Context + ShouldComponentUpdate might be dangerous. Can you think of why is that?
Using `Context` with `shouldComponentUpdate` can be dangerous because `shouldComponentUpdate` only compares the values of the props and state, and does not take into account changes to context values. If a component that relies on context is memoized with `shouldComponentUpdate`, it might not re-render when the context value changes.

## Describe 3 ways to pass information from a component to its PARENT.
Three ways are:

- Callback props: We can pass a function as a prop to the child component, which the child can then call with any data it needs to pass back to the parent.

- Events: We can use the `SyntheticEvent` system in React to dispatch custom events from the child component, which the parent can listen to and handle as needed.

- Context: We can use the `Context` API in React to provide a shared value between the parent and child components.

## Give 2 ways to prevent components from re-rendering.
Two ways are:

- Use `React.memo` or `PureComponent` to memoize the component and avoid re-rendering if the props haven't changed.

- Implement a custom `shouldComponentUpdate` method that compares the relevant parts of the props and state and only returns `true` if they have actually changed.

## What is a fragment and why do we need it? Give an example where it might break my app.
A fragment allows grouping a list of children. Fragments are useful when we need to return multiple elements from a component, but don't want to wrap them in a container element like a `<div>`.

For example, instead of rendering a list of items like this:
```
<div>
  <Item />
  <Item />
  <Item />
</div>
```
We can use a fragment to group the items without adding any extra markup to the DOM:
```
<>
  <Item />
  <Item />
  <Item />
</>
```
An example where using fragments might break an app is if we're returning an array of elements from a component, and forget to wrap them in a fragment or container element.

## Give 3 examples of the HOC pattern.
Three examples are:

- `withRouter`: A HOC that provides access to the current history, location, and match objects
- `connect`: A HOC from the react-redux library that connects a component to a Redux store, providing it with the necessary state.

- `withStyles`: A HOC from the @material-ui/styles library that allows you to inject custom styles as props into a component, based on a set of CSS rules or JSS styles.

## What's the difference in handling exceptions in promises, callbacks and async...await?
When handling exceptions in JavaScript, there are a few differences:

- Promises: When using promises, we can handle exceptions with a .catch() method, which will be called if the promise is rejected. We can also use `try/catch` blocks with `async/await` to handle exceptions within an asynchronous function that returns a promise.

- Callbacks: When using callbacks, we pass an error as the first argument to the callback function, and handle it in the function that calls the callback. For example:
```
function getData(callback) {
  // Perform some async operation
  if (error) {
    callback(error, null);
  } else {
    callback(null, data);
  }
}

getData((error, data) => {
  if (error) {
    // Handle the error
  } else {
    // Use the data
  }
});
```
- `async/await`: When using `async/await`, we can use a `try/catch` block to handle exceptions within an asynchronous function. For example:
```
async function getData() {
  try {
    // Perform some async operation
    return data;
  } catch (error) {
    // Handle the error
  }
}
const data = await getData();
```

## How many arguments does setState take and why is it async?
`setState` takes two arguments: an object that represents the new state, and an optional callback function that will be called after the state has been updated.

`setState` is asynchronous in order to improve performance and prevent unnecessary re-renders.

When we call `setState`, React batches multiple state updates together and performs them in a single update to the DOM, which is more efficient than updating the DOM multiple times for each state change.

## List the steps needed to migrate a Class to Function Component.
To migrate a class component to a function component, you can follow these steps:

1. Remove the `render` method and replace it with a function that returns the JSX that was being rendered.

2. Remove the `constructor` method and any initialization code that was being performed in it.

3. Replace any instance variables (`this.state`, `this.props`) with the appropriate function arguments (`props`, `useState` hooks).

4. Replace any lifecycle methods (`componentDidMount`, `componentDidUpdate`) with the appropriate hooks (`useEffect`).

5. Remove the class declaration and export the function component instead.

## List a few ways styles can be used with components.

Styles can be used with components in several ways in React:

1. Inline styles: We can pass a style object as a prop to a component, using the style attribute in JSX.

2. CSS classes: We can define CSS classes in a separate stylesheet and apply them to a component using the `className` attribute.

3. CSS modules: We can use CSS modules to scope styles to a specific component, preventing them from affecting other components on the page.

4. Styled components: We can use a library like `styled-components` to define styles for a component using tagged template literals, allowing us to encapsulate styles within the component itself.

## How to render an HTML string coming from the server?
To render an HTML string that's coming from the server in React, we can use the `dangerouslySetInnerHTML` attribute in JSX.
```
function MyComponent() {
  const htmlString = "<h1>Hello, world!</h1>";

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```
In this example, the `dangerouslySetInnerHTML` attribute is used to set the HTML content of the `div` element to the `htmlString` variable. The content is inserted into the DOM using the `innerHTML` property, which can be dangerous if the HTML contains untrusted user input or other malicious code.

It's important to use this attribute with caution, and only when you trust the source of the HTML content.

For example, we could use `dangerouslySetInnerHTML` in a task that was provided, in a section where we render highlighted matching part of the text from the Autocomplete.tsx component, like this:
```
<ul className="autocomplete__list">
  {filteredData.map((item, index) => (
    <li
      key={item}
      onClick={() => this.handleOptionClick(item)}
      dangerouslySetInnerHTML={{ __html: item.replace(new RegExp(`(${inputValue})`, "gi"), "<strong>$1</strong>") }}
    />
  )}
</ul>
```
