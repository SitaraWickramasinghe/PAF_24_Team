package com.foodies.foodies.controller;

import com.foodies.foodies.exception.ResourceNotFoundException;
import com.foodies.foodies.model.User;
import com.foodies.foodies.repository.UserRepository;
import com.foodies.foodies.security.CurrentUser;
import com.foodies.foodies.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping("/user/search")
    public List<User> searchUsers(@RequestParam("name") String name, @CurrentUser UserPrincipal userPrincipal) {
        List<User> userList = userRepository.findUsersWithPartOfName(name);
        return userList.stream().filter(n-> n.getId() != userPrincipal.getId()).collect(Collectors.toList());
    }

    @GetMapping("/user/follow")
    public User followUsers(@RequestParam("follow") String follow, @CurrentUser UserPrincipal userPrincipal){
        System.out.println(follow);
        User currentUser = userRepository.findById(userPrincipal.getId()).get();
        User follower = userRepository.findById(Long.parseLong(follow)).get();

        if(follower == null){
            throw new RuntimeException("Follower not available");
        }
        Boolean alreadyFollowed = false;
        for (Long userid: currentUser.getFollowers()
             ) {
            if (userid.equals(follower.getId())){
                alreadyFollowed = true;
            }
            
        }

        if (alreadyFollowed){
            throw new RuntimeException("already followed");
        }
        List<Long> listFollowers = currentUser.getFollowers();
        listFollowers.add(follower.getId());
        currentUser.setFollowers(listFollowers);
        userRepository.save(currentUser);
        return currentUser;
    }
}
