<?php
if (!is_user_logged_in()) {
  wp_redirect(esc_url(site_url('/')));
  exit;
}
get_header();
while (have_posts()) {
  the_post();
  pageBanner();
?>

  <div class="container container--narrow page-section">

    <!-- Create Note -->
    <div class="create-note">
      <h2 class="headline headline--medium">Create New Note</h2>
      <input type="text" class="new-note-title" placeholder="Title of your note..." />
      <textarea name="" id="" cols="30" rows="10" placeholder="You not here..." class="new-note-body"></textarea>
      <span class="submit-note">Create Note</span>
      <span class="note-limit-message">Note limit reached: delete an axisting note to make room for a new one.</span>
    </div>
    <!-- /Create Note -->


    <ul class="min-list link-list" id="my-notes">
      <?php
      $posts =
        array(
          'post_type'       => 'note',
          'posts_per_page'   => -1,
          'author' => get_current_user_id()
        );
      // Display posts.
      $userNotes = new WP_Query($posts);
      while ($userNotes->have_posts()) {
        $userNotes->the_post(); ?>
        <li data-id="<?php the_ID() ?>">
          <input class="note-title-field" value="<?php echo str_replace('Private: ', '', esc_attr(get_the_title())); ?>">
          <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
          <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
          <textarea class="note-body-field"><?php echo esc_textarea(get_the_content()); ?></textarea>
          <!-- <textarea class="note-body-field"><?php /*echo esc_attr(wp_strip_all_tags(get_the_content()));*/ ?></textarea> -->
          <span class="update-note btn btn--blue btn--samill"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
        </li>

      <?php } ?>
    </ul>
  </div>

<?php }
get_footer();

?>