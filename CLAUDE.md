# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Run local development server: `hugo server -D`
- Build site: `hugo -D`
- Build site to docs directory: `hugo -D -d docs`

## Style Guidelines
- **HTML/Template**: Follow Hugo template conventions with clear indentation
- **Markdown**: Use standard Markdown for content files with YAML frontmatter
- **CSS**: Maintain terminal-hacker aesthetic defined in termhacker.css
- **Project Structure**:
  - Content in content/ directory
  - Layouts in layouts/ directory
  - Static assets in static/ directory
- **Naming**: Use kebab-case for files and directories
- **Links**: Use relative links when linking between site pages

## Content Guidelines
- Course descriptions should be clear, concise, and highlight key benefits
- Logo images follow naming pattern: bash_[course-type].[png|svg]