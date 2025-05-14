
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.2.0] - 2025-05-14

### Added

- Added a Cookie helper class to determine the __Secure prefix

## [1.1.0] - 2025-05-13

### Removed

- Removed any nestjs dependencies to keep library flexible 

## [1.0.6] - 2025-05-13

### Changed

- Removed nestjs imports for `NativeException` for them to be able to be used in a client context.

## [1.0.5] - 2024-11-18

### Removed

- Remove specific project branding.

## [1.0.4] - 2024-11-18

### Added

- Added proper support for cjs bundling.

## [1.0.3] - 2024-11-18

### Added

- Added `HttpHandler` class and `Logger` to package.

### Fixed

- Documentation typos.

## [1.0.2] - 2024-11-18

### Fixed

- Fix barrel exports, for proper `index.d.ts` file generation.


## [1.0.1] - 2024-11-18

### Fixed

- Move function `getHttpStatusText` to a private scope, to prevent it from being exported publicly.

## [1.0.0] - 2024-11-15

Initial release
