## Advanced Assignment
(This is advanced and not a required assignment.) After completing the backend assignment, you should have the ability to create APIs. You've also had experience connecting to APIs remotely through the frontend. Now let's try connecting our own frontend to our own backend!
  
1. First, run both the frontend and backend services simultaneously. They should each occupy different ports.
2. Mimic the method used in the remote assignments by using the useSWRFetch function. The API URL will look something like http://localhost:[port_name]/getData.
  
This time, no bugs have been left for you to fix! Just go ahead and complete it, turning it into a fully functional service. After finishing, just send a PR. The branch name is `assignment_part_2`.


## Material Tailwind

This time, we've incorporated **Material Tailwind** into our frontend codebase. It's a UI library that is compatible with TailwindCSS. You can use it as follows:
```
<Button
    size="sm"
    variant="text"
    className="m-4"
    onClick={() => setText("")}
>
    Clear
</Button>
```
As you can see, in addition to the parameters provided by Material Tailwind (like size and color), we can also add Tailwind CSS classes within the className attribute for adjustments. This gives us greater flexibility in using this UI library. Furthermore, this library provides us with commonly used, attractive components. You can observe its extensive usage in the `/partials/chat` folder in our assignment example.  
  
For details on how to use it and naming conventions, refer to the [official documentation](https://www.material-tailwind.com/docs/react/accordion)  
Note: This package might not be ideal for use with ChatGPT. It's recommended to thoroughly review the documentation when using it.

## Heroicon
For smaller icons, you can use existing packages. You can find the corresponding icons and names on this website: https://heroicons.com/
In React, simply change the name to Upper Camel Case to locate the corresponding component, for instance, "x-mark" becomes `<XMarkIcon />`.

## React Hook
React Hook can be somewhat challenging to grasp. It's advisable for students to make good use of GPT, with a special emphasis on understanding `useState` & `useEffect`. You can initially perceive useState as: values that need to change and cause a page to **re-render**. For example, with `setIsOpen` and `isOpen`, the latter determines whether a window is open or not. When I click a button, I use `setIsOpen` to control whether `isOpen` is `true` or `false`. Similarly, if I need to display a string on a page, or call an API with an id value that changes frequently, I would use useState!  
  
`useEffect`, on the other hand, is used for actions required during page initialization or when certain values change and some code needs to be executed. For instance, if the selected conversation changes, and I want the page to automatically scroll down to the latest conversation, I would use `useEffect` to track this.  
  
While one can delve deep into its intricate workings and best practices, our current objective is to "learn how to understand and replicate". It's beneficial to rely on GPT and #appwork-stack-overflow!

## Clerk

We've integrated the service **clerk** for login and registration. It makes everything remarkably simple. We'll need you to register an account on the Clerk official website: https://clerk.com/docs/quickstarts/setup-clerk. After that, fill in the keys in the `.env` file, and you can then use the services we've set up for you.


