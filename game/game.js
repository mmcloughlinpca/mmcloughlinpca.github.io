/* Goal
 *  Program should display text&paths and show next text & paths based on selected path.
 * 
 * Approach
 *  Each story has 'id', 'text' 'paths'
 *  Each path has 'target' which should point to specific story id and 'text' as display value.
 *
 * Task left to owner
 *  As this structure is very very rough draft, it is very fragile 
 *  So your task is build more solid structure and use this code as a rough guide.
 */
$(document).ready(function() {
  // jQuery targets
  var
    $storyContainer = $("#story-container"),
    $pathContainer = $("#path-container"),
    $imgContainer = $("#img-container");
  
  // Sample stories (hard coded!!)
  // This is just a data used to represent story&paths
  // You can probably make constructor for both story and path
  var stories = [
    {
      id: 0,
      text: "It is summertime again, vacation time. You go to your uncle's house. He takes you on a tour around the city. There are many old buildings, but the oldest of all is on Main Street. The address is 880. He says that it is haunted, but you don't believe him.",
      paths: [
        {target: 1, text: "Do you go inside?"},
        {target: 2, text: "Do you stay there?"}
      ]
    },
    {
      id: 1,
      text: "You say, \"I will go inside.\" He says, \"I want to watch you.\" You start up the stone steps of the old haunted house. You open the door and step inside and suddenly a sharp arrow streaks across in front of you! But it misses you.",
      paths: [
        {target: 3, text: "Do you go up the staircase?"},
        {target: 4, text: "Do you go through the swinging doors?"}
      ]
    },
    {
      id: 2,
      text: "You stay there. Then you decide to go home, have an ice cream, and go to bed. THE END."
    },
    {
      id: 3,
      text: "You go up the stairs. You lean against the railing and it breaks. You fall and that's the end of you. THE END."
    },
    {
      id: 4,
      text: "You go through the swinging doors. You walk through the room.",
      paths:[
        {target: 5, text: "Do you go into the closet?"},
        {target: 6, text: "Do you go into the passageway under the house?"}
      ]
    },
    {
      id: 5,
      text: "You go into the closet. You fall through a trapdoor and break your leg. The walls are too smooth to climb. There is no other way up. THE END."
    },
    {
      id: 6,
      text: "You go into a passageway under the house. You make your way along and it leads to a trapdoor that takes you back to where you started from. You meet a policeman at the top and he says to you, \"You were lucky to get out of there. Don't ever go in there again!\" You go home and have some ice cream. THE END."
    }
  ]

  // Takes paths object and return it as button element with custom attribute.
  function getPathHTML(paths) {
    return paths.map(function(path) {
      return '<button class="path-btn" data-target=' + path.target + '>' + path.text + '</button>'
    }).concat();
  }

  // Takes story object and return paragraph element with story text.
  function getStoryHTML(story) {
    return '<p class="story-text">' + story.text + '</p>'
  }

  // Check if the story is ending story.
  function isEnded(story) {
    if (story.paths)
      return false;
    return true;
  }
  
  // Takes id and displays interactive story.
function displayInteractiveStory(stories, id) {
    var story = stories[id];

    var $story = $(getStoryHTML(story));
    $story.hide();
    $story.fadeIn(1000);

    $storyContainer.append($story);  
    if (isEnded(story))
      $pathContainer.html('<button class="path-btn" data-target="replay">Replay?</button>');
    else  
      $pathContainer.html(getPathHTML(story.paths));
  }
  
  // Event handler that will setup and invoke displayInteractiveStory()
  // Event delegation makes sure child element of $pathContainer listens to event.
  $pathContainer.click(function(event) {
    var $pathBtn = $(event.target);
    var nextStoryId = $pathBtn.attr('data-target');
    // You definitely want to refactor this part as it looks ugly and easily breaks.
    if (nextStoryId === 'replay') {
      $storyContainer.html('');
      $pathContainer.html('');
      displayInteractiveStory(stories, 0);
    } else
      displayInteractiveStory(stories, nextStoryId);
  });
   

  // Display initial story on inital render
  // story with id 0 refers to start of the story.
  displayInteractiveStory(stories, 0);
});
