workflow "Build, Test, and Publish" {
  on = "push"
  resolves = ["Send coverage to codecov", "Publish"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Lint" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "run lint"
}

action "Tests Unit" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "run test:unit"
}

action "Tests Int" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "run test:int"
}

action "Send coverage to codecov" {
  needs = ["Tests Unit"]
  uses = "Atrox/codecov-action@v0.1.2"
  secrets = ["CODECOV_TOKEN"]
}

# Filter for a new tag
action "IsTag" {
  needs = ["Lint", "Tests Unit", "Tests Int"]
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "IsTag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}