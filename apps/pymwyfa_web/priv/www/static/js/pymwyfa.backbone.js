// Generated by CoffeeScript 1.3.3
(function() {

  (function($) {
    var ChallengeCollection, ChallengeCollectionView, ChallengeModel, CharityCollection, CharityCollectionView, CharityModel, RaceCollection, RaceCollectionView, RaceModel, RunningModel, RunningView, UserModel, UserView, router;
    router = null;
    UserView = Backbone.View.extend({
      events: {
        'click a.support': 'supportTest'
      },
      initialize: function(spec) {
        var charityCollection, raceCollection;
        raceCollection = spec.model.get('races');
        charityCollection = spec.model.get('charities');
        if (raceCollection.length > 0) {
          this.races = new RaceCollectionView({
            model: raceCollection
          });
        }
        if (charityCollection.length > 0) {
          return this.charities = new CharityCollectionView({
            model: charityCollection
          });
        }
      },
      supportTest: function(e) {
        e.preventDefault();
        $(e.target).fadeOut(500);
        return setTimeout(function() {
          return router.navigate(e.target.hash, {
            trigger: true,
            replace: false
          });
        }, 600);
      },
      render: function() {
        var html, self;
        self = this;
        html = $(router.renderTemplate('user-details.bb', self.model.toJSON()));
        $(self.el).html(html);
        if (self.races) {
          $(self.el).append(self.races.render({
            is_current: self.model.get('is_current'),
            user_id: self.model.get('id')
          }));
        }
        if (self.charities) {
          $(self.el).append(self.charities.render({
            is_current: self.model.get('is_current'),
            user_id: self.model.get('id'),
            user_name: self.model.get('name')
          }));
        }
        return self.el;
      }
    });
    UserModel = Backbone.Model.extend({
      toJSON: function() {
        return {
          is_current: this.get('is_current'),
          id: this.get('id'),
          name: this.get('name'),
          img: this.get('img')
        };
      },
      initialize: function(spec) {
        this.set('id', spec.user.id);
        this.set('name', spec.user.name);
        this.set('first_name', spec.user.first_name);
        this.set('last_name', spec.user.last_name);
        this.set('img', spec.user.img);
        if (spec.races) {
          this.set('races', new RaceCollection($.map(spec.races, function(s) {
            return new RaceModel(s);
          })));
        }
        if (spec.charities) {
          return this.set('charities', new CharityCollection($.map(spec.charities, function(s) {
            return new CharityModel(s);
          })));
        }
      }
    });
    RaceModel = Backbone.Model.extend({
      initialize: function(spec) {
        this.set('id', spec.id);
        this.set('name', spec.name);
        this.set('location', spec.location);
        this.set('lat', spec.lat);
        this.set('lng', spec.lng);
        this.set('distance', spec.distance);
        this.set('units', spec.units);
        this.set('datetime', spec.datetime);
        this.set('url', spec.url);
        this.set('img', spec.img);
        return this.set('blurb', spec.blurb);
      }
    });
    RaceCollection = Backbone.Collection.extend({
      model: RaceModel
    });
    RaceCollectionView = Backbone.View.extend({
      render: function(data) {
        var html, self;
        self = this;
        data = $.extend(data, {
          races: self.model.toJSON()
        });
        html = $(router.renderTemplate('race-list.bb', data));
        $(self.el).html(html);
        return self.el;
      }
    });
    CharityModel = Backbone.Model.extend({
      initialize: function(spec) {
        this.set('id', spec.id);
        this.set('name', spec.name);
        this.set('img', spec.img);
        this.set('url', spec.url);
        return this.set('blurb', spec.blurb);
      }
    });
    CharityCollection = Backbone.Collection.extend({
      model: CharityModel
    });
    CharityCollectionView = Backbone.View.extend({
      render: function(data) {
        var html;
        data = $.extend(data, {
          charities: this.model.toJSON()
        });
        html = $(router.renderTemplate('charity-list.bb', data));
        $(this.el).html(html);
        return this.el;
      }
    });
    ChallengeModel = Backbone.Model.extend({
      initialize: function(spec) {
        this.set('from_id', spec.from);
        this.set('from_name', spec.from_name);
        this.set('to_id', spec.to);
        this.set('race', new RaceModel(spec.race));
        this.set('flat', spec.flat);
        this.set('bonus', spec.bonus);
        this.set('scale', spec.scale);
        this.set('unit', spec.unit);
        return this.set('charity_id', spec.charity);
      }
    });
    ChallengeCollection = Backbone.Collection.extend({
      model: ChallengeModel
    });
    ChallengeCollectionView = Backbone.View.extend({
      render: function(data) {
        var html;
        data = $.extend(data, {
          challenges: this.model.toJSON()
        });
        html = $(router.renderTemplate('challenge-list.bb', data));
        $(this.el).html(html);
        return this.el;
      }
    });
    RunningModel = Backbone.Model.extend({
      initialize: function(spec) {
        this.set('user', new UserModel({
          user: spec.user
        }));
        this.set('race', new RaceModel(spec.race));
        this.set('goal', spec.goal);
        this.set('result', spec.result);
        this.set('bib', spec.bib);
        this.set('challenges', new ChallengeCollection($.map(spec.challenges, function(s) {
          return new ChallengeModel(s);
        })));
        return this.set('charities', new CharityCollection($.map(spec.charities, function(s) {
          return new CharityModel(s);
        })));
      },
      toJSON: function() {
        return {
          user: (this.get('user')).toJSON(),
          race: (this.get('race')).toJSON(),
          is_current: this.get('is_current'),
          goal: this.get('goal'),
          result: this.get('result'),
          bib: this.get('bib')
        };
      }
    });
    RunningView = Backbone.View.extend({
      initialize: function(spec) {
        var challengeCollection, charityCollection;
        challengeCollection = spec.model.get('challenges');
        charityCollection = spec.model.get('charities');
        this.challenges = new ChallengeCollectionView({
          model: challengeCollection
        });
        if (charityCollection.length > 0) {
          return this.charities = new CharityCollectionView({
            model: charityCollection
          });
        }
      },
      render: function() {
        var html, self;
        self = this;
        html = $(router.renderTemplate('running.bb', self.model.toJSON()));
        $(self.el).html(html);
        if (self.challenges) {
          self.$('#data-challenge-list').html(self.challenges.render({
            is_current: self.model.get('is_current')
          }));
        }
        App.challenge.postProcess({
          goal: self.model.get('goal'),
          elem: self.$('#slider-finish'),
          donationEl: self.$("#expected-donation"),
          infoEls: self.$("span.data-challenge-info")
        });
        if (self.charities) {
          $(self.el).append(self.charities.render({
            is_current: self.model.get('is_current'),
            user_name: (self.model.get('user')).get('name')
          }));
        }
        return self.el;
      }
    });
    window.AppRouter = Backbone.Router.extend({
      routes: {
        'login': 'login',
        'user/:id': 'userHome',
        'user/:uid/race/:rid': 'userRace',
        '': 'home'
      },
      setView: function(view, title) {
        var html, newTitle;
        html = view.render();
        $('#content').html(html);
        newTitle = 'PYMWYFA';
        if (!!title && title.length > 0) {
          newTitle += " - " + title;
        }
        return document.title = newTitle;
      },
      logout: function() {
        var self;
        self = this;
        return $.post("/logout", function() {
          return location.reload();
        });
      },
      login: function() {
        var view;
        if (!this.isUserSignedIn()) {
          view = new LoginView();
          return this.setView(view, "Login");
        } else {
          return this.home();
        }
      },
      home: function() {
        if (this.isUserSignedIn()) {
          return this.navigate("user/" + this.currentUserId, {
            trigger: true,
            replace: true
          });
        } else {
          return this.navigate("login", {
            trigger: true,
            replace: true
          });
        }
      },
      userHome: function(id) {
        var self;
        self = this;
        App.utility.setxClass("header-link", "li", "user", "active");
        return $.getJSON("/static/js/pymwyfa_stub.json", function(stub) {
          var model, user, view;
          user = stub.user_pages[id];
          user.is_current = self.currentUserId === id;
          model = new UserModel(user);
          view = new UserView({
            model: model
          });
          return self.setView(view, model.get('name'));
        });
      },
      userRace: function(uid, rid) {
        var self;
        self = this;
        App.utility.setxClass("header-link", "li", "races", "active");
        return $.getJSON("/static/js/pymwyfa_stub.json", function(stub) {
          var model, userrace, view;
          userrace = stub.user_race_pages["" + uid + ":" + rid];
          userrace.is_current = self.currentUserId === userrace.user.id;
          model = new RunningModel(userrace);
          view = new RunningView({
            model: model
          });
          return self.setView(view, "Race Details");
        });
      },
      loadTemplate: function(name) {
        var template, url;
        url = "/views/" + name + ".handlebars?v=" + (Math.floor(100 * Math.random()) + 1);
        template = $.ajax({
          url: url,
          async: false
        }).responseText;
        return Handlebars.compile(template);
      },
      renderTemplate: function(name, data) {
        var self, tmpl;
        self = this;
        tmpl = self.loadTemplate(name);
        return tmpl(data || {});
      },
      isUserSignedIn: function() {
        return this.currentUserId !== null && this.currentUserId !== void 0 && this.currentUserId !== 0;
      },
      start: function(userId) {
        var hash;
        this.currentUserId = userId;
        router = this;
        Backbone.history.start();
        $(".logout").click(function(e) {
          e.preventDefault();
          return router.logout();
        });
        hash = window.location.hash;
        if (hash === '' || hash === '#') {
          if (!userId) {
            return this.navigate('login', {
              trigger: true,
              replace: true
            });
          } else {
            return this.navigate("user/" + userId, {
              trigger: true,
              replace: true
            });
          }
        }
      }
    });
    return window.App = {
      utility: {
        secToStr: function(seconds) {
          var hourStr, hours, minStr, mins, rem, secStr, secs;
          hours = Math.floor(seconds / 3600);
          rem = seconds % 3600;
          mins = Math.floor(rem / 60);
          secs = rem % 60;
          hourStr = hours > 0 ? "" + hours + "h" : "";
          minStr = mins < 10 ? "0" + mins + "m" : "" + mins + "m";
          secStr = secs < 10 ? "0" + secs : "" + secs;
          return "" + hourStr + minStr + secStr + "s";
        },
        setxClass: function(dataname, type, key, value) {
          var needle, old, things;
          things = "data-" + dataname;
          old = $("" + type + "[" + things + "][class=" + value + "]");
          needle = $("" + type + "[" + things + "=" + key + "]");
          old.removeClass(value);
          return needle.addClass(value);
        }
      },
      challenge: {
        postProcess: function(data) {
          var finalamt, flatz;
          flatz = $.map(data.infoEls, function(el) {
            return {
              flat: parseInt($(el).attr("data-challenge-f"))
            };
          });
          finalamt = _.foldl(flatz, function(a, c) {
            return a + c.flat;
          }, 0);
          data.donationEl.html(finalamt.toFixed(2));
          return App.challenge.slider(parseInt(data.goal), data.elem, data.infoEls, data.donationEl);
        },
        slider: function(goal, elem, infoels, donationEl) {
          var max, min, step;
          if (goal < 3600) {
            step = 1;
            max = goal + 5;
            min = goal - 120;
          } else {
            step = 30;
            max = goal + 60;
            min = goal - 900;
          }
          return elem.slider({
            value: goal,
            min: min,
            max: max,
            step: step,
            slide: function(event, ui) {
              var challenges;
              challenges = $.map(infoels, function(el) {
                return {
                  from: $(el).attr("data-challenge-from"),
                  bonus: parseInt($(el).attr("data-challenge-b")),
                  flat: parseInt($(el).attr("data-challenge-f")),
                  scale: parseInt($(el).attr("data-challenge-s")),
                  unit: parseInt($(el).attr("data-challenge-u"))
                };
              });
              $("#expected-finish").html(App.utility.secToStr(ui.value));
              donationEl.html(0);
              return $.map(challenges, function(c) {
                var newamt;
                newamt = c.flat;
                if (ui.value < goal) {
                  newamt = newamt + c.bonus + (goal - ui.value) * c.scale / c.unit;
                }
                $("span[data-challenge-amt='" + c.from + "']").html(newamt.toFixed(2));
                return donationEl.html((parseFloat(donationEl.html()) + newamt).toFixed(2));
              });
            }
          });
        }
      }
    };
  })(jQuery);

}).call(this);
