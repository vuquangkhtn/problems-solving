# Micro-Frontends

### What is Web Components? Describe Web Components technologies

Web Components are a set of web platform APIs that allow you to create reusable custom elements with their own encapsulated functionality. They are based on standard HTML, CSS, and JavaScript, and can be used in any web application.

Web Components consist of three main technologies:

1. Custom Elements: Custom Elements are an extension of the HTML standard that allow is to create new HTML elements with their own behavior (e.g., custom attributes, methods, and events) and styling. We can use them as containers of our micro-frontends. They are defined using the `customElements.define()` method, and can be used just like any other HTML element.

2. Shadow DOM: a set of JavaScript APIs that allow you to create encapsulated DOM trees, rendered separately from the main DOM. It allows you to hide the internal structure and styling of a custom element, so that it does not affect the rest of the page. It is created using the `attachShadow()` method, and can be styled using regular CSS.

3. HTML Templates: HTML Templates allow you to define reusable HTML markup that can be cloned and inserted into the DOM. They are defined using the `<template>` element, and can be accessed using the `content` property.

### Why is it recommended to use unidirectional data flow in micro-frontends?

Unidirectional data flow in micro-frontends refers to the practice of passing data from a parent component to a child component, rather than the other way around. This approach makes it easier to reason about the flow of data in the application, and helps to prevent unexpected side effects.

In a micro-frontends architecture, each micro-frontend is a self-contained unit with its own state and behavior. When data needs to be shared between micro-frontends, it is passed down from the parent component to the child component. This ensures that each micro-frontend has a clear understanding of the data it is working with, and makes it easier to maintain and debug the application.

Overall, unidirectional data flow in micro-frontends helps to keep the application predictable and maintainable, and is a best practice for building scalable and modular applications.

### BFF in Micro-Frontends

BFF (Backend for Frontend) is a server-side application that acts as a middleman between the frontend and the backend. It is responsible for handling requests from the frontend, fetching data from the backend, and returning the data to the frontend.

In a micro-frontends architecture, each micro-frontend has its own BFF. This allows to create unique API entry point for each micro-frontend, which makes it easier to maintain and debug the application.

Overall, BFF in micro-frontends helps to keep the application predictable and maintainable, and is a best practice for building scalable and modular applications.

### API Gateway in Micro-Frontends

API Gateway is a server-side application that acts as a middleman between the frontend and the backend. It is responsible for handling requests from the frontend, routing them to the appropriate backend service, and returning the data to the frontend.

In a micro-frontends architecture, each micro-frontend has its own API Gateway. This allows each micro-frontend to have a clear understanding of the data it is working with, and makes it easier to maintain and debug the application.

API Gateway allows to create a single API entry point per business domain, which enables to partition your APIs and policies by business domain. This helps to avoid having a single point of failure, and encapsulates the bounded context of each micro-frontend.

API Gateway is also responsible for handling cross-cutting concerns such as authentication, authorization, and logging. This ensures that the application is secure and maintainable.

### What is Domain-Driven Design (DDD)? Describe the Concepts of Domain-Driven Design

Domain-Driven Design is a software development approach that focuses on modeling software to reflect the business domain it serves

Consists 4 main concepts:

- Bounded Context: Complex systems are divided into smaller, self-contained parts, each with its own model and language, to manage complexity and allow different parts of the system to have different interpretations of terms
- Focus on the Domain: The primary goal is to solve business problems by building software around the core business processes and logic, not just the technology
- Collaboration: close collaboration between domain experts (business stakeholders) and developers to ensure that the software aligns with the business needs and requirements
- Ubiquitous Language: A common language is developed and used by both domain experts and the development team, ensuring everyone understands the business concepts and can apply them to the software
