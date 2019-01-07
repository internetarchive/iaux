Before adding new components, please make sure you have read and understood the [Fractal user guide](https://fractal.build/guide).

## Component Types
There are three types of components: design system, project-specific, and legacy.
- **Design system components** use CSS/JS that is distributed as part of this system and are intended to be usable across projects.
- **Project-specific components** are defined inside their respective project and are not intended for use by other projects.
- **Legacy components** are not part of the design system ecosystem, and may rely on CSS/JS that is not part of the system.

It's highly recommended that most components begin their life as project-specific so that designers and developers can work out the kinks in a real environment. Project-specific components may then be promoted to design system components as long as they are well-documented and reusable in different contexts (or, if they really _are_ only relevant for one project, they may remain project-specific indefinitely). Legacy components should be converted into project-specific or design system components whenever possible.

Archive.org (a.k.a. Petabox) has its own Fractal instance that documents its project-specific components, currently located at `www/sf/style-guide/` within the `petabox` repository. Please go there to add Archive.org-specific components.

## Adding a Component
Create a new folder within the `components/` directory and within the appropriate subdirectory (based on the Tier that your component falls into) and follow the instructions in the Fractal user guide. Use existing components as guides for how to set up your markup and data.

Any CSS and JavaScript that should be distributed as part of the design system code library should go inside `src/styles/` or `src/scripts/`. Markup is **not** distributed as part of the library so it should live in Handlebars templates in Fractal.

**Important:** Every component should have a `README.md` file with complete documentation of how to use it (see template below).

### Adding a Legacy Component
Legacy components whose code is not yet ported into the system can be documented on the [Legacy Components page](./legacy-components).

Most of the time, however, you will want to document these legacy components within their respective projects, since they are usually not generic enough to be a part of the larger design system.

As with normal components, use the template below for the documentation.

--------------

# New Component Template
This is where you describe what the component is and how it works. For legacy components that don't have code in the design system repository, include at least one screenshot.

![Include a screenshot of the component here](../../images/example-component.png)

## Sub-Components
- List (and link to) components that are composed together to create the component.
- Tier 1 components and some Tier 2/3 components can omit this section.

## Do
- List things designers and developers should do with the component.
- Provide guidance around typography, colors, accessibility, etc.

## Don’t
- List things designers and developers should **not** do with the component.
- Include specific examples of incorrect usage if necessary.
- Include things in this section if they should **never** or **almost never** be done.

## Caution
- List information designers and developers should keep in mind when using the component.
- Include things in this section if it’s acceptable for someone to do them as long as they’re careful about it.

## See Also
- List related or similar components.

## TODO
- List tasks that should be done in the future to continue design and development of this component.
