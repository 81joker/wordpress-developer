<?php

get_header();
pageBanner(array(
  'title' => 'Our Campuses',
  'subtitle' => 'We have several conveniently located campuses.'
));
 ?>

<div class="container container--narrow page-section">

<div class="acf-map">

<?php
  while(have_posts()) {
    the_post();
   ?>

  <?php } ?>
</div>



</div>

<?php get_footer();

?>